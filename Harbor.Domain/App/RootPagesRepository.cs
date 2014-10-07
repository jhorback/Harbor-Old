using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.App
{
	public class RootPagesRepository : IRootPagesRepository
	{
		private readonly IAppSettingRepository _appSettingRepository;
		private readonly IMemCache _memCache;
		const string rootPagesKey = "RootPages";
		string[] reservedRoutes = { "error", "404", "styleguide", "jst", "signin" };


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
				else
				{
					appSetting = new AppSetting
					{
						Name = rootPagesKey
					};
				}
				pages = pages ?? (pages = new RootPages());
				_memCache.SetGlobal(rootPagesKey, appSetting, DateTime.Now.AddMonths(1));
			}
			return pages;
		}

		public bool IsARootPage(string name)
		{
			return GetRootPageID(name) != null;
		}

		public string GetRootPageToken(int pageId)
		{
			var rootPages = GetRootPages();
			if (rootPages.Pages.ContainsValue(pageId))
			{
				return rootPages.Pages.FirstOrDefault(i => i.Value == pageId).Key;
			}
			return null;
		}

		public int? GetRootPageID(string name)
		{
			name = name.ToLower();

			var rootPages = GetRootPages();
			if (rootPages.Pages.ContainsKey(name) == false)
			{
				return null;
			}

			return rootPages.Pages[name];
		}


		public void RemoveRootPage(string name)
		{
			var pages = GetRootPages();
			pages.Pages.Remove(name);
			saveAppSetting(pages);
		}

		public void AddRootPage(string name, int pageId)
		{
			name = tokenize(name);
			if (reservedRoutes.Contains(name))
			{
				throw new InvalidOperationException(string.Format("'{0}' is a reserved route.", name));
			}

			var pages = GetRootPages();
			pages.Pages.Add(name, pageId);
			saveAppSetting(pages);
		}

		public void Save()
		{
			_memCache.BustGlobal<RootPages>(rootPagesKey);
			_appSettingRepository.Save();
		}

		private string tokenize(string name)
		{
			return name.ToLower().Replace(" ", "");
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
