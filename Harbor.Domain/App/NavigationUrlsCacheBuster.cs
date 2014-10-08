using Harbor.Domain.App.Events;
using Harbor.Domain.Event;

namespace Harbor.Domain.App
{
	public class NavigationUrlsCacheBuster : IEventSubscriber<HarborAppChanged>, IEventSubscriber<RootPagesChanged>
	{
		private readonly IGlobalCache<NavigationUrls> _navigationUrlsCache;

		public NavigationUrlsCacheBuster(IGlobalCache<NavigationUrls> navigationUrlsCache)
		{
			_navigationUrlsCache = navigationUrlsCache;
		}

		public void Handle(HarborAppChanged data)
		{
			_navigationUrlsCache.Remove();
		}

		public void Handle(RootPagesChanged data)
		{
			_navigationUrlsCache.Remove();
		}
	}
}
