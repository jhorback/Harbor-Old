using System.Collections.Generic;
using Harbor.Domain.App.Events;
using Harbor.Domain.Event;

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
