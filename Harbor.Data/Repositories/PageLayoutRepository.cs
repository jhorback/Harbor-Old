using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using Harbor.Domain;
using Harbor.Domain.Pages;

namespace Harbor.Data.Repositories
{
	public class PageLayoutRepository : IPageLayoutRepository
	{
		private readonly IUnitOfWork _unitOfWork;
		readonly HarborContext context;

		public PageLayoutRepository(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			context = unitOfWork.Context;
		}

		public IEnumerable<PageLayout> FindAll(Func<PageLayout, bool> filter = null)
		{
			return filter == null ?
				Query().AsEnumerable()
				:
				Query().Where(filter).AsEnumerable();
		}

		public IQueryable<PageLayout> Query()
		{
			return context.PageLayouts.AsQueryable();
		}

		public PageLayout FindById(object id)
		{
			return findCachedItemByID(id as int?);
		}

		public PageLayout FindById(int id, bool readOnly)
		{
			if (readOnly)
				return findCachedItemByID(id);
			return findItemByID(id);
		}

		public PageLayout FindById(object id, bool readOnly)
		{
			if (readOnly)
				return findCachedItemByID(id as int?);
			return findItemByID(id as int?);
		}

		public PageLayout Create(PageLayout entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);

			// make sure the name/username is unique
			var links = FindAll(l => l.UserName == entity.UserName && l.Title.ToLower() == entity.Title.ToLower()).FirstOrDefault();
			if (links != null)
			{
				throw new DomainValidationException(string.Format("There is already a set of links named {0}.", entity.Title));
			}

			entity = context.PageLayouts.Add(entity);
			context.SaveChanges();
			return entity;
		}

		public PageLayout Update(PageLayout entity)
		{
			var entry = context.Entry(entity);

			DomainObjectValidator.ThrowIfInvalid(entity);
			
			context.SaveChanges();
			clearCachedItemByID(entity.PageLayoutID);
			return entity;
		}

		public void Delete(PageLayout entity)
		{
			//if (context.Entry(entity).State == System.Data.EntityState.Detached)
			//{
			//	context.PageLayouts.Attach(entity);
			//}

			clearCachedItemByID(entity.PageLayoutID);
			context.PageLayouts.Remove(entity);
			context.SaveChanges();
		}

		public void Save()
		{
			_unitOfWork.Save();
		}

		#region private caching
		private const string itemCacheKey = "Harbor.Data.Repositories.PageLayoutRepository";

		private PageLayout findItemByID(int? id)
		{
			PageLayout item = FindAll(d => d.PageLayoutID == id).FirstOrDefault();
			return item;
		}

		private PageLayout findCachedItemByID(int? id)
		{
			var cacheKey = itemCacheKey + id;
			var item = MemoryCache.Default.Get(cacheKey) as PageLayout;
			if (item == null)
			{
				item = findItemByID(id);
				if (item != null)
				{
					MemoryCache.Default.Set(cacheKey, item, DateTime.Now.AddSeconds(10));
				}
			}
			return item;
		}

		private void clearCachedItemByID(int id)
		{
			var cacheKey = itemCacheKey + id;
			MemoryCache.Default.Remove(cacheKey);
		}
		#endregion
	}
}
