using System.Collections.Generic;
using System.Web.Configuration;
using Harbor.Domain.Extensions;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;

namespace Harbor.Domain.App
{
	public class HarborAppRepository : IHarborAppRepository
	{
		IAppSettingRepository appSettings;
		IPageRepository pageRepository;

		public HarborAppRepository(IAppSettingRepository appSettings, IPageRepository pageRepository)
		{
			this.appSettings = appSettings;
			this.pageRepository = pageRepository;
		}

		public HarborApp GetApp()
		{
			var app = new HarborApp();

			var showSignInLink = appSettings.GetSetting("ShowSignInLink").AsBool();
			if (showSignInLink != null)
				app.ShowSignInLink = showSignInLink ?? false;

			var appName = appSettings.GetSetting("ApplicationName").AsString();
			if (appName != null)
				app.ApplicationName = appName;

			app.HomePageID = appSettings.GetSetting("HomePageID").AsInt();
			if (app.HomePageID != null)
			{
				app.HomePage = pageRepository.FindById(app.HomePageID);
			}
			
			app.NavigationLinks = GetNavigationLinks();

			app.Theme = appSettings.GetSetting("Theme").AsString();
			if (string.IsNullOrEmpty(app.Theme))
				app.Theme = "default";

			app.GoogleAnalyticsAccount = WebConfigurationManager.AppSettings["googleAnalyticsAccount"];
			return app;
		}

		public void SetApp(HarborApp app, User user)
		{
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
			}
		}

		public void Save()
		{
			appSettings.Save();
		}

		private AppSetting setSetting(string name, object value)
		{
			var settingDO = appSettings.FindByName(name, readOnly: false);
			var strvalue = value == null ? null : value.ToString();
			if (settingDO == null)
			{
			    settingDO = appSettings.Create(new AppSetting { Name = name, Value = strvalue });
				appSettings.Save();
			}
			else
			{
				if (settingDO.Value != strvalue)
				{
					settingDO.Value = strvalue;
					settingDO = appSettings.Update(settingDO);
				}
			}
			return settingDO;
		}

		public IEnumerable<NavigationLink> GetNavigationLinks()
		{
			IEnumerable<NavigationLink> links = null;
			var navLinksSetting = appSettings.GetSetting("NavigationLinks");
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
