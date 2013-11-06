using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using Harbor.Domain;
using Harbor.Domain.Products;

namespace Harbor.Data.Repositories
{
	public class PayPalButtonRepository : IPayPalButtonRepository
	{
		readonly HarborContext context;

		public PayPalButtonRepository(HarborContext context)
		{
			this.context = context;
		}

		public IEnumerable<PayPalButton> FindAll(Func<PayPalButton, bool> filter = null)
		{
			return filter == null ?
				Query().AsEnumerable()
				:
				Query().Where(filter).AsEnumerable();
		}

		public IQueryable<PayPalButton> Query()
		{
			return context.PayPalButtons.AsQueryable();
		}

		public PayPalButton FindById(object id)
		{
			return findCachedItemByID(id as int?);
		}

		public PayPalButton FindById(int id, bool readOnly)
		{
			if (readOnly)
				return findCachedItemByID(id);
			return findItemByID(id);
		}

		public PayPalButton FindById(object id, bool readOnly)
		{
			if (readOnly)
				return findCachedItemByID(id as int?);
			return findItemByID(id as int?);
		}

		public PayPalButton Create(PayPalButton entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);

			entity = context.PayPalButtons.Add(entity);
			context.SaveChanges();
			return entity;
		}

		public PayPalButton Update(PayPalButton entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);
			
			context.SaveChanges();
			clearCachedItemByID(entity.PayPalButtonID);
			return entity;
		}

		public void Delete(PayPalButton entity)
		{
			if (context.Entry(entity).State == System.Data.EntityState.Detached)
			{
				context.PayPalButtons.Attach(entity);
			}

			clearCachedItemByID(entity.PayPalButtonID);
			context.PayPalButtons.Remove(entity);
			context.SaveChanges();
		}

		#region private caching
		private const string itemCacheKey = "Harbor.Data.Repositories.PayPalButtonRepository.";

		private PayPalButton findItemByID(int? id)
		{
			PayPalButton item = FindAll(d => d.PayPalButtonID == id).FirstOrDefault();
			return item;
		}

		private PayPalButton findCachedItemByID(int? id)
		{
			var cacheKey = itemCacheKey + id;
			var item = MemoryCache.Default.Get(cacheKey) as PayPalButton;
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
