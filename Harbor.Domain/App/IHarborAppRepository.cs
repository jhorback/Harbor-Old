using System.Collections.Generic;
using Harbor.Domain.Security;

namespace Harbor.Domain.App
{
	public interface IHarborAppRepository
	{
		HarborApp GetApp();
		void SetApp(HarborApp app, User user);
		IEnumerable<NavigationLink> GetNavigationLinks();
		IEnumerable<KeyValuePair<string, string>> GetNavigationLinkUrls();
		void Save();
	}
}
