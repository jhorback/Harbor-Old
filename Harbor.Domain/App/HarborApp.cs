﻿using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using Harbor.Domain.Pages;

namespace Harbor.Domain.App
{
	public class HarborApp : IAggregateRoot
	{
		public HarborApp()
		{
			ApplicationName = "Harbor";
			
			// make distinction about preview vs actual release
			// do so with the version # - how.


			var harborDomain = Assembly.GetAssembly(typeof(HarborApp));
			var version = harborDomain.GetName().Version;
			if (version.Build == 0)
			{
				Version = string.Format("v{0}.{1} preview", version.Major, version.Minor);				
			}
			else
			{
				Version = string.Format("v{0}.{1}", version.Major, version.Minor);								
			}
			FullVersion = version.ToString();

			ShowSignInLink = true;
			HomePageID = null;
		}

		public string ApplicationName { get; set; }

		public string Version { get; set; }

		public string FullVersion { get; set; }

		public bool ShowSignInLink { get; set; }

		public int? HomePageID { get; set; }

		public Page HomePage { get; set; }

		public string Theme { get; set; }

		public string FooterHtml { get; set; }

		public string ParsedFooterHtml { get; set; }

		public IEnumerable<NavigationLink> NavigationLinks { get; set; }

		public string GoogleAnalyticsAccount { get; set; }
	}
}
