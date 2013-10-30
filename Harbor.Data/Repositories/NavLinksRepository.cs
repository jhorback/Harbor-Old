using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using Harbor.Domain;
using Harbor.Domain.PageNav;

namespace Harbor.Data.Repositories
{
	public class NavLinksRepository : INavLinksRepository
	{
		readonly HarborContext context;

		public NavLinksRepository(HarborContext context)
		{
			this.context = context;
		}

		public IEnumerable<NavLinks> FindAll(Func<NavLinks, bool> filter = null)
		{
			return filter == null ?
				Query().AsEnumerable()
				:
				Query().Where(filter).AsEnumerable();
		}

		public IQueryable<NavLinks> Query()
		{
			return context.NavLinks.AsQueryable();
		}

		public NavLinks FindById(object id)
		{
			return findCachedItemByID(id as int?);
		}

		public NavLinks FindById(int id, bool readOnly)
		{
			if (readOnly)
				return findCachedItemByID(id);
			return findItemByID(id);
		}

		public NavLinks FindById(object id, bool readOnly)
		{
			if (readOnly)
				return findCachedItemByID(id as int?);
			return findItemByID(id as int?);
		}

		public NavLinks Create(NavLinks entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);

			// make sure the name/username is unique
			var links = FindAll(l => l.UserName == entity.UserName && l.Name.ToLower() == entity.Name.ToLower()).FirstOrDefault();
			if (links != null)
			{
				throw new DomainValidationException(string.Format("There is already a set of links named {0}.", entity.Name));
			}

			entity = context.NavLinks.Add(entity);
			context.SaveChanges();
			return entity;
		}

		public NavLinks Update(NavLinks entity)
		{
			var entry = context.Entry(entity);
			if (entry.State == System.Data.EntityState.Detached)
				throw new InvalidOperationException("The entitiy was in a detached state.");

			DomainObjectValidator.ThrowIfInvalid(entity);

			
			context.SaveChanges();
			clearCachedItemByID(entity.NavLinksID);
			return entity;
		}

		public void Delete(NavLinks entity)
		{
			if (context.Entry(entity).State == System.Data.EntityState.Detached)
			{
				context.NavLinks.Attach(entity);
			}
			
			clearCachedItemByID(entity.NavLinksID);
			context.NavLinks.Remove(entity);
			context.SaveChanges();
		}

		#region private caching
		private const string itemCacheKey = "Harbor.Data.Repositories.NavLinksRepository.";

		private NavLinks findItemByID(int? id)
		{
			NavLinks item = FindAll(d => d.NavLinksID == id).FirstOrDefault();
			return item;
		}

		private NavLinks findCachedItemByID(int? id)
		{
			var cacheKey = itemCacheKey + id;
			var item = MemoryCache.Default.Get(cacheKey) as NavLinks;
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
