using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Harbor.Domain;
using Harbor.Domain.Event;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Events;

namespace Harbor.Data.Repositories
{
	public class PageRepository : IPageRepository
	{
		readonly HarborContext context;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IObjectFactory _objectFactory;
		private readonly ILogger _logger;
		private readonly IEventPublisher _eventPublisher;


		public PageRepository(
			IUnitOfWork	unitOfWork,
			IObjectFactory objectFactory,
			ILogger logger,
			IEventPublisher eventPublisher 
		) {
			_unitOfWork = unitOfWork;
			_objectFactory = objectFactory;
			_logger = logger;
			_eventPublisher = eventPublisher;

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


		public Page FindById(int id)
		{
			return findById(id);
		}

		public Page FindById(object id)
		{
			return findById(id as int?);
		}

		Page findById(int? id)
		{
			Page page = FindAll(d => d.PageID == id).FirstOrDefault();
			if (page != null)
			{
				var loadPipeline = new PageLoadPipeline(_objectFactory);
				loadPipeline.Execute(page);
			}
			return page;
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

			
			entity.Modified = DateTime.Now;
			_eventPublisher.Publish(new PageChangedEvent { PageID = entity.PageID });
			return entity;
		}

		public void Delete(Page entity)
		{
			var deletePipeline = new PageDeletePipeline(_objectFactory);
			deletePipeline.Execute(entity);
			context.Pages.Remove(entity);

			_eventPublisher.Publish(new PageDeletedEvent { Page = entity });
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
	}
}
