using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
		private readonly IGlobalCache<HarborApp> _harborAppCache;
		private readonly IPathUtility _pathUtility;
		private readonly IRootPagesRepository _rootPagesRepository;

		public HarborAppRepository(
			IAppSettingRepository appSettings,
			IPageRepository pageRepository,
			IGlobalCache<HarborApp> harborAppCache,
			IPathUtility pathUtility,
			IRootPagesRepository rootPagesRepository 
			)
		{
			_appSettings = appSettings;
			_pageRepository = pageRepository;
			_harborAppCache = harborAppCache;
			_pathUtility = pathUtility;
			_rootPagesRepository = rootPagesRepository;
		}

		public HarborApp GetApp()
		{
			var app = _harborAppCache.Get();
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
			if (string.IsNullOrEmpty(app.FooterHtml))
			{
				app.FooterHtml = "NO FOOTER";
			}
			app.ParsedFooterHtml = parseFooter(app.FooterHtml);

			app.GoogleAnalyticsAccount = WebConfigurationManager.AppSettings["googleAnalyticsAccount"];

			_harborAppCache.Set(app, DateTime.Now.AddDays(1));
			return app;
		}

		private string parseFooter(string html)
		{
			var webRoot = VirtualPathUtility.ToAbsolute("~/");
			var replacedHtml = html.Replace("href=\"~/", "href=\"" + webRoot);
			return replacedHtml;
		}

		private const string harborAppCacheKey = "HarborApp";

		public void SetApp(HarborApp app, User user)
		{
			_harborAppCache.Remove();
			if (user.HasPermission(UserFeature.SystemSettings))
			{
				setSetting("Theme", app.Theme);
				setSetting("ApplicationName", app.ApplicationName);			
			}
			if (user.HasPermission(UserFeature.SiteSettings))
			{
				setSetting("ShowSignInLink", app.ShowSignInLink);
				setSetting("HomePageID", app.HomePageID);
				syncNavigationLinks(app);
				setSetting("NavigationLinks", JSON.Stringify(app.NavigationLinks));
				setSetting("FooterHtml", app.FooterHtml);
			}
		}

		void syncNavigationLinks(HarborApp app)
		{
			// keep the link text in sync
			var navLinks = app.NavigationLinks.ToList();
			var pageIDs = navLinks.Select(l => l.PageID).Distinct().ToArray();
			var pages = _pageRepository.Query().Where(p => pageIDs.Contains(p.PageID)).ToDictionary(p => p.PageID);
			foreach (var link in navLinks)
			{
				if (pages.ContainsKey(link.PageID))
				{
					link.Text = pages[link.PageID].Title;
				}
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


		// jch! would like to cache this
		/// <summary>
		/// The is the page name and the value is the url.
		/// </summary>
		/// <returns></returns>
		public IEnumerable<KeyValuePair<string, string>> GetNavigationLinkUrls()
		{
			string url;
			var links = GetNavigationLinks();
			foreach (var link in links)
			{
				var rootPageToken = _rootPagesRepository.GetRootPageToken(link.PageID);
				if (link.PageID == 0)
				{
					url = "~/";
				}
				else if (rootPageToken != null)
				{
					url = string.Format("~/{0}", rootPageToken);
				}
				else
				{
					url = string.Format("~/id/{0}/{1}", link.PageID, link.Text.ToLower().Replace(' ', '-'));
				}
				
				url = _pathUtility.ToAbsolute(url);
				yield return new KeyValuePair<string, string>(url, link.Text);
			}
		}
	}
}
