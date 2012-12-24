using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain;
using Harbor.Domain.App;

namespace Harbor.Data.Repositories
{
	public class AppSettingRepository : IAppSettingRepository
	{
		readonly HarborContext context;

		public AppSettingRepository(HarborContext context)
		{
			this.context = context;
		}

		#region IAppSettingRepository
		public AppSetting FindByName(string name)
		{
			var entity = FindAll(e => System.String.Compare(e.Name, name, System.StringComparison.OrdinalIgnoreCase) == 0).FirstOrDefault();
			return entity;
		}

		public AppSetting GetSetting(string name)
		{
			var setting = FindByName(name);
			return setting ?? new AppSetting { Name = name };
		}
		#endregion


		#region IRepository
		public IEnumerable<AppSetting> FindAll(Func<AppSetting, bool> filter = null)
		{
			return filter == null ?
				context.AppSettings.ToList() :
				context.AppSettings.Where(filter).ToList();
		}

		public IQueryable<AppSetting> Query()
		{
			context.Configuration.ProxyCreationEnabled = false;
			return context.AppSettings.AsQueryable();
		}

		public AppSetting FindById(object id)
		{
			if (id == null)
				return null;

			var entity = FindAll(e => e.AppSettingID == (int)id).FirstOrDefault();
			return entity;
		}

		public AppSetting Create(AppSetting entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);
			var existingEntity = FindByName(entity.Name);
			if (existingEntity != null)
				throw new InvalidOperationException("The setting already exists.");

			entity = context.AppSettings.Add(entity);
			context.SaveChanges();
			return entity;
		}

		public AppSetting Update(AppSetting entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);

			var entry = context.Entry(entity);
			if (entry.State == System.Data.EntityState.Detached)
			{
				throw new Exception("The entity is in a detached state.");
			}

			context.SaveChanges();
			return entity;
		}

		public void Delete(AppSetting entity)
		{
			if (context.Entry(entity).State == System.Data.EntityState.Detached)
			{
				throw new Exception("The entity is in a detached state.");
			}
			context.AppSettings.Remove(entity);
			context.SaveChanges();
		}
		#endregion
	}
}
