﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Runtime.Caching;
using System.Web.Caching;
using Harbor.Domain;
using Harbor.Domain.Pages;

namespace Harbor.Data.Repositories
{
	public class PageRepository : IPageRepository
	{
		readonly HarborContext context;
		private readonly IUnitOfWork _unitOfWork;
		readonly IPageFactory _pageFactory;
		private readonly IObjectFactory _objectFactory;
		private readonly ILogger _logger;

		private const string pageCacheKey = "Harbor.Data.Repositories.PageRepository.";

		public PageRepository(
			IUnitOfWork	unitOfWork,
			IPageFactory pageFactory,
			IObjectFactory objectFactory,
			ILogger logger
		) {
			_unitOfWork = unitOfWork;
			_pageFactory = pageFactory;
			_objectFactory = objectFactory;
			_logger = logger;

			context = _unitOfWork.Context;
		}

		#region IRepository
		public IEnumerable<Page> FindAll(Func<Page, bool> filter)
		{
			return filter == null ?
				Query()
					.AsEnumerable()
				:
				Query().Where(d => d.Enabled)
					.Where(filter)
					.AsEnumerable();
		}

		public IEnumerable<Page> FindAll(PageQuery pageQuery)
		{
			return pageQuery.Query(Query());
		}

		public int FindAllCount(PageQuery pageQuery)
		{
			return pageQuery.TotalCount(Query());
		}

		//return context.Pages.Where(d => d.Enabled == true).AsQueryable();
		public IQueryable<Page> Query(IncludePageResources include)
		{
			context.Configuration.ProxyCreationEnabled = false;
			var pages =  context.Pages.Include(p => p.Properties);
			if (include.HasFlag(IncludePageResources.PageLayout))
				pages = pages.Include(p => p.Layout);
			if (include.HasFlag(IncludePageResources.Roles))
				pages = pages.Include(p => p.PageRoles);
			if (include.HasFlag(IncludePageResources.PreviewImage))
				pages = pages.Include(p => p.PreviewImage);
			if (include.HasFlag(IncludePageResources.Files))
				pages = pages.Include(p => p.Files); //.Select(f => f.Owner)); // jch* subselecting like this does work owner is null before but not after	
			// pages = pages.Include(p => p.PageLayout
			if (include.HasFlag(IncludePageResources.PageLinks))
				pages = pages.Include(p => p.PageLinks);
			if (include.HasFlag(IncludePageResources.PayPalButtons))
				pages = pages.Include(p => p.PayPalButtons);
			return pages;
		}

		public IQueryable<Page> Query()
		{
			return Query(IncludePageResources.All);
		}


		public Page FindById(int id, bool readOnly)
		{
			if (readOnly)
				return findCachedPageByID(id);
			return findPageByID(id);
		}

		public Page FindById(object id)
		{
			return findCachedPageByID(id as int?);
		}

		public Page Create(Page entity)
		{
			// var page = _pageFactory.Create(entity.AuthorsUserName, entity.PageTypeKey, entity.Title, entity.Public);
			var page = entity; // _pageFactory.Create(entity.AuthorsUserName, entity.PageTypeKey, entity.Title, entity.Public);
			if (Exists(page.AuthorsUserName, page.Title))
				throw new DomainValidationException("The page already exists.");
			page.Created = DateTime.Now;
			page.Modified = DateTime.Now;
			page.Enabled = true;
			DomainObjectValidator.ThrowIfInvalid(page);
			page = context.Pages.Add(page);
			return page;
		}

		public Page Update(Page entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);

			
			// run the update pipeline before removing deleted page roles and deleted properties
			var pageUpdatePipeline = new PageUpdatePipeline(_objectFactory);
			pageUpdatePipeline.Execute(entity);


			// remove properties
			foreach (var prop in entity.DeletedProperties)
			{
				context.PageProperties.Remove(prop);
			}
			entity.DeletedProperties = new List<PageProperty>();
		

			// remove roles
			foreach (var role in entity.DeletedPageRoles)
			{
				context.PageRoles.Remove(role);
			}
			entity.DeletedPageRoles = new List<PageRole>();

			
			// update the modified date and clear the cache
			entity.Modified = DateTime.Now;
			clearCachedPageByID(entity.PageID);
			return entity;
		}

		public void Delete(Page entity)
		{
			clearCachedPageByID(entity.PageID);

			var deletePipeline = new PageDeletePipeline(_objectFactory);
			deletePipeline.Execute(entity);

			context.Pages.Remove(entity);
		}

		public void Save()
		{
			_unitOfWork.Save();
		}
		#endregion


		#region IPageRepository
		public Page Find(string author, string title)
		{
			var pages = FindAll(d => d.AuthorsUserName.ToLower() == author.ToLower() &&
				d.Title.ToLower() == title.ToLower());
			return pages.FirstOrDefault();
		}

		public bool Exists(string author, string title)
		{
			return Find(author, title) != null;
		}
		#endregion


		#region private
		void clearCachedPageByID(int? pageID = 0)
		{
			var cacheKey = pageCacheKey + pageID;
			MemoryCache.Default.Remove(cacheKey);
		}

		Page findCachedPageByID(int? pageID = 0)
		{
			var cacheKey = getCacheKey(pageID);
			var page = MemoryCache.Default.Get(cacheKey) as Page;
			if (page == null)
			{
				page = findPageByID(pageID);
			}
			return page;
		}

		Page findPageByID(int? pageID = 0)
		{
			Page page = FindAll(d => d.PageID == pageID).FirstOrDefault();
			if (page != null)
			{
				var loadPipeline = new PageLoadPipeline(_objectFactory);
				loadPipeline.Execute(page);
				cachePage(page);
			}
			return page;
		}

		string getCacheKey(int? pageId = 0)
		{
			return pageCacheKey + pageId;
		}

		void cachePage(Page page)
		{
			MemoryCache.Default.Set(getCacheKey(page.PageID), page, DateTime.Now.AddSeconds(10));			
		}
		#endregion
	}
}
