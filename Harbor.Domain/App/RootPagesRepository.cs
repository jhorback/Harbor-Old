using System;
using System.Linq;
using Harbor.Domain.App.Events;
using Harbor.Domain.Event;

namespace Harbor.Domain.App
{
	public class RootPagesRepository : IRootPagesRepository
	{
		private readonly IAppSettingRepository _appSettingRepository;
		private readonly IGlobalCache<RootPages> _rootPagesCache;
		private readonly IEventPublisher<RootPagesChanged> _rootPagesChangedPublisher;
		const string rootPagesKey = "RootPages";
		string[] reservedRoutes = { "error", "404", "styleguide", "jst", "signin" };


		public RootPagesRepository(
			IAppSettingRepository appSettingRepository,
			IGlobalCache<RootPages> rootPagesCache,
			IEventPublisher<RootPagesChanged> rootPagesChangedPublisher
			)
		{
			_appSettingRepository = appSettingRepository;
			_rootPagesCache = rootPagesCache;
			_rootPagesChangedPublisher = rootPagesChangedPublisher;
		}

		public RootPages GetRootPages()
		{
			var pages =	_rootPagesCache.Get();
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
				_rootPagesCache.Set(pages);
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
			_rootPagesChangedPublisher.Publish();
			_rootPagesCache.Remove();
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
