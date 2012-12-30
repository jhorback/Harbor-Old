using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

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
	}
}
