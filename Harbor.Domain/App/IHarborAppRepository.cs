using System.Collections.Generic;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;

namespace Harbor.Domain.App
{
	public interface IHarborAppRepository
	{
		HarborApp GetApp();
		void SetApp(HarborApp app, User user);
		IEnumerable<NavigationLink> GetNavigationLinks();
		IEnumerable<FrameNavigationLink> GetNavigationLinkUrls(Page page);
		void Save();
	}
}
