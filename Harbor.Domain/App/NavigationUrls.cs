using System.Collections.Generic;

namespace Harbor.Domain.App
{
	public class NavigationUrls
	{
		public NavigationUrls()
		{
			Urls = new List<KeyValuePair<string, string>>();
		}

		public List<KeyValuePair<string, string>> Urls { get; set; }
	}
}
