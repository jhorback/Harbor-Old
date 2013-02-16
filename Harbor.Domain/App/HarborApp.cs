using System.Collections.Generic;
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
			
			var harborDomain = Assembly.GetAssembly(typeof(HarborApp));
			var version = harborDomain.GetName().Version;
			Version = string.Format("v{0}.{1}-{2}", version.Minor, version.Build, version.Revision);
			
			ShowSignInLink = true;
			HomePageID = null;
		}

		public string ApplicationName { get; set; }

		public string Version { get; set; }

		public bool ShowSignInLink { get; set; }

		public int? HomePageID { get; set; }

		public Page HomePage { get; set; }

		public string Theme { get; set; }

		public IEnumerable<NavigationLink> NavigationLinks { get; set; }
	}
}
