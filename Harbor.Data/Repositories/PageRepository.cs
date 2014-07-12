using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Runtime.Caching;
using Harbor.Domain;
using Harbor.Domain.Pages;

namespace Harbor.Data.Repositories
{
	public class PageRepository : IPageRepository
	{
		readonly HarborContext context;
		readonly IPageFactory pageFactory;
		private readonly IObjectFactory _objectFactory;
		private readonly ILogger _logger;

		string pageCacheKey = "Harbor.Data.Repositories.PageRepository.";

		public PageRepository(
			HarborContext context,
			IPageFactory pageFactory,
			IObjectFactory objectFactory,
			ILogger logger
		) {
			this.context = context;
			this.pageFactory = pageFactory;
			_objectFactory = objectFactory;
			_logger = logger;
		}

		#region IRepository
		public IEnumerable<Page> FindAll(Func<Page, bool> filter)
		{
			return filter == null ?
				Query()
					.AsEnumerable()
				:
				Query().Where(d => d.Enabled == true)
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
				return findCachedPageByID(id as int?);
			return findPageByID(id as int?);
		}

		public Page FindById(object id)
		{
			return findCachedPageByID(id as int?);
		}

		public Page Create(Page entity)
		{
			var page = pageFactory.Create(entity.AuthorsUserName, entity.PageTypeKey, entity.Title, entity.Public);
			if (Exists(page.AuthorsUserName, page.Title))
				throw new DomainValidationException("The page already exists.");
			page.Created = DateTime.Now;
			page.Modified = DateTime.Now;
			page.Enabled = true;
			DomainObjectValidator.ThrowIfInvalid(page);
			page = context.Pages.Add(page);
			context.SaveChanges();
			return page;
		}

		public Page Update(Page entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);

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

			// update the modified date
			entity.Modified = DateTime.Now;


			try
			{
				var pageUpdatePipeline = new PageUpdatePipeline(_objectFactory);
				pageUpdatePipeline.Execute(entity);
				context.SaveChanges();
			}
			catch (DbEntityValidationException dbEx)
			{
				_logger.Error(dbEx);
				foreach (var validationErrors in dbEx.EntityValidationErrors)
				{
					foreach (var validationError in validationErrors.ValidationErrors)
					{
						_logger.Error("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
					}
				}
				throw new Exception("A data error occured when updating the page.", dbEx);
			}
			catch (Exception e)
			{
				_logger.Error("UpdatePage", e);
				throw new Exception("An error occured when updating the page.", e);
			}

			clearCachedPageByID(entity.PageID);
			return FindById(entity.PageID);
		}

		public void Delete(Page entity)
		{
			clearCachedPageByID(entity.PageID);
			context.Pages.Remove(entity);
			context.SaveChanges();
		}
		#endregion


		#region IPageRepository
		public Page Find(string author, string title)
		{
			var pages = this.FindAll(d => d.AuthorsUserName == author && d.Title == title);
			return pages.FirstOrDefault();
		}

		public bool Exists(string author, string title)
		{
			return this.Find(author, title) != null;
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
			var cacheKey = pageCacheKey + pageID;
			var page = MemoryCache.Default.Get(cacheKey) as Page;
			if (page == null)
			{
				page = findPageByID(pageID);
				if (page != null)
				{
					MemoryCache.Default.Set(cacheKey, page, DateTime.Now.AddSeconds(10));
					// var cacheKey2 = (pageCacheKey + page.AuthorsUserName + page.Name).ToLower();
					// MemoryCache.Default.Set(cacheKey2, page, DateTime.Now.AddSeconds(10));
				}
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
			}
			return page;
		}
		#endregion
	}
}
