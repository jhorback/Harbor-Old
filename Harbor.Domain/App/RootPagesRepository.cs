using System;
using System.Linq;

namespace Harbor.Domain.App
{
	public class RootPagesRepository : IRootPagesRepository
	{
		private readonly IAppSettingRepository _appSettingRepository;
		private readonly IMemCache _memCache;
		const string rootPagesKey = "RootPages";

		public RootPagesRepository(IAppSettingRepository appSettingRepository, IMemCache memCache)
		{
			_appSettingRepository = appSettingRepository;
			_memCache = memCache;
		}

		public RootPages GetRootPages()
		{
			var pages = _memCache.GetGlobal<RootPages>(rootPagesKey);
			if (pages == null)
			{
				var appSetting = _appSettingRepository.FindByName(rootPagesKey);
				if (appSetting != null)
				{
					pages = JSON.Parse<RootPages>(appSetting.Value);
				}
				pages = pages ?? (pages = new RootPages());
				_memCache.SetGlobal(rootPagesKey, appSetting, DateTime.Now.AddMonths(1));
			}
			return pages;
		}

		public bool IsRootPage(string name)
		{
			var rootPages = GetRootPages();
			return rootPages.Pages.Any(i => String.Equals(i.Value, name, StringComparison.CurrentCultureIgnoreCase));
		}

		public void RemoveRootPage(int id)
		{
			var pages = GetRootPages();
			pages.Pages.Remove(id);
			saveAppSetting(pages);
		}

		public void AddRootPage(int id, string text)
		{
			var pages = GetRootPages();
			pages.Pages.Add(id, text);
			saveAppSetting(pages);
		}

		public void Save()
		{
			_memCache.BustGlobal<RootPages>(rootPagesKey);
			_appSettingRepository.Save();
		}

		private void saveAppSetting(RootPages pages)
		{
			var appSetting = _appSettingRepository.FindByName(rootPagesKey, readOnly: false);
			var settingValue = JSON.Stringify(pages);
			if (appSetting == null)
			{
				appSetting = _appSettingRepository.Create(new AppSetting {Name = rootPagesKey, Value = settingValue});
			}
			else
			{
				if (settingValue != appSetting.Value)
				{
					appSetting.Value = settingValue;
					_appSettingRepository.Update(appSetting);
				}
			}
		}
	}
}
