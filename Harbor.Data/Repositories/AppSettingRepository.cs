using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using Harbor.Domain;
using Harbor.Domain.App;

namespace Harbor.Data.Repositories
{
	public class AppSettingRepository : IAppSettingRepository
	{
		readonly HarborContext context;
		private readonly IUnitOfWork _unitOfWork;
		private readonly ILogger _logger;

		public AppSettingRepository(IUnitOfWork unitOfWork, ILogger logger)
		{
			context = unitOfWork.Context;
			_unitOfWork = unitOfWork;
			_logger = logger;
		}

		#region IAppSettingRepository
		public AppSetting FindByName(string name, bool readOnly = true)
		{
			if (!readOnly)
			{
				clearCache();
			}

			try
			{
				var entity =
					FindAll(e => System.String.Compare(e.Name, name, System.StringComparison.OrdinalIgnoreCase) == 0).FirstOrDefault();
				return entity;
			}
			catch (Exception e)
			{
				_logger.Error(e);
				throw;
			}
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
			var settings = getCachedSettings();
			return filter == null ?
				settings.ToList() :
				settings.Where(filter).ToList();
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
			clearCache();
			return entity;
		}

		public AppSetting Update(AppSetting entity)
		{
			DomainObjectValidator.ThrowIfInvalid(entity);
			clearCache();
			return entity;
		}

		public void Delete(AppSetting entity)
		{
			context.AppSettings.Remove(entity);
			clearCache();
		}

		public void Save()
		{
			_unitOfWork.Save();
		}
		#endregion

		#region private
		string cacheKey = "Harbor.Data.Repositories.AppSettingRepository.";

		void clearCache()
		{
			MemoryCache.Default.Remove(cacheKey);
		}

		IEnumerable<AppSetting> getCachedSettings()
		{
			var settings = MemoryCache.Default.Get(cacheKey) as IEnumerable<AppSetting>;
			if (settings == null)
			{
				settings = findAllSettings();
				if (settings != null)
				{
					MemoryCache.Default.Set(cacheKey, settings, DateTime.Now.AddSeconds(10));
				}
			}
			return settings;
		}

		IEnumerable<AppSetting> findAllSettings()
		{
			return context.AppSettings.ToList();
		}
		#endregion
	}
}
