using System;
using System.Collections.Generic;
using System.Web.Configuration;
using Harbor.Domain.Extensions;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;

namespace Harbor.Domain.App
{
	public class HarborAppRepository : IHarborAppRepository
	{
		readonly IAppSettingRepository _appSettings;
		readonly IPageRepository _pageRepository;
		private readonly IMemCache _memCache;

		public HarborAppRepository(IAppSettingRepository appSettings, IPageRepository pageRepository, IMemCache memCache)
		{
			_appSettings = appSettings;
			_pageRepository = pageRepository;
			_memCache = memCache;
		}

		public HarborApp GetApp()
		{
			var app = _memCache.GetGlobal<HarborApp>(harborAppCacheKey);
			if (app != null)
			{
				return app;
			}

			app = new HarborApp();

			var showSignInLink = _appSettings.GetSetting("ShowSignInLink").AsBool();
			if (showSignInLink != null)
				app.ShowSignInLink = showSignInLink ?? false;

			var appName = _appSettings.GetSetting("ApplicationName").AsString();
			if (appName != null)
				app.ApplicationName = appName;

			app.HomePageID = _appSettings.GetSetting("HomePageID").AsInt();
			if (app.HomePageID != null)
			{
				app.HomePage = _pageRepository.FindById(app.HomePageID);
			}
			
			app.NavigationLinks = GetNavigationLinks();

			app.Theme = _appSettings.GetSetting("Theme").AsString();
			if (string.IsNullOrEmpty(app.Theme))
				app.Theme = "default";

			app.FooterHtml = _appSettings.GetSetting("FooterHtml").AsString();

			app.GoogleAnalyticsAccount = WebConfigurationManager.AppSettings["googleAnalyticsAccount"];

			_memCache.SetGlobal(harborAppCacheKey, app, DateTime.Now.AddDays(1));
			return app;
		}

		private const string harborAppCacheKey = "HarborApp";

		public void SetApp(HarborApp app, User user)
		{
			_memCache.BustGlobal<HarborApp>(harborAppCacheKey);
			if (user.HasPermission(UserFeature.SystemSettings))
			{
				setSetting("Theme", app.Theme);
				setSetting("ApplicationName", app.ApplicationName);			
			}
			if (user.HasPermission(UserFeature.SiteSettings))
			{
				setSetting("ShowSignInLink", app.ShowSignInLink);
				setSetting("HomePageID", app.HomePageID);
				setSetting("NavigationLinks", JSON.Stringify(app.NavigationLinks));
				setSetting("FooterHtml", app.FooterHtml);
			}
		}

		public void Save()
		{
			_appSettings.Save();
		}

		private AppSetting setSetting(string name, object value)
		{
			var settingDO = _appSettings.FindByName(name, readOnly: false);
			var strvalue = value == null ? null : value.ToString();
			if (settingDO == null)
			{
			    settingDO = _appSettings.Create(new AppSetting { Name = name, Value = strvalue });
				_appSettings.Save();
			}
			else
			{
				if (settingDO.Value != strvalue)
				{
					settingDO.Value = strvalue;
					settingDO = _appSettings.Update(settingDO);
				}
			}
			return settingDO;
		}

		public IEnumerable<NavigationLink> GetNavigationLinks()
		{
			IEnumerable<NavigationLink> links = null;
			var navLinksSetting = _appSettings.GetSetting("NavigationLinks");
			links = JSON.Parse<IEnumerable<NavigationLink>>(navLinksSetting.Value);

			if (links == null)
			{
				return new List<NavigationLink>();
			}
			var linksList = new List<NavigationLink>(links);
			if (linksList.Count == 0)
			{
				linksList.Add(new NavigationLink { PageID = 0, Text = "Home" });
			}
			return linksList;
		}
	}
}
