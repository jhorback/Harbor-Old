using System.Collections.Generic;
using System.Reflection;
using Harbor.Domain.Pages;

namespace Harbor.Domain.App
{
	public class HarborApp
	{
		public HarborApp()
		{
			ApplicationName = "Test App";
			Version = Assembly.GetExecutingAssembly().GetName().Version.ToString();
			ShowSignInLink = true;
			HomePageID = null;
		}

		public string ApplicationName { get; set; }

		public string Version { get; set; }

		public bool ShowSignInLink { get; set; }

		public int? HomePageID { get; set; }

		public Page HomePage { get; set; }

		public IEnumerable<NavigationLink> NavigationLinks { get; set; }
	}
}
