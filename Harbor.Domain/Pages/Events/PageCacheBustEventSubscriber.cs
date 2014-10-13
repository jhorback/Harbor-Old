using Harbor.Domain.Caching;
using Harbor.Domain.Event;

namespace Harbor.Domain.Pages.Events
{
	public class PageCacheBustEventSubscriber :
		IEventSubscriber<PageChangedEvent>,
		IEventSubscriber<PageDeletedEvent>
	{
		private readonly IUserCache<Page> _pageCache;

		public PageCacheBustEventSubscriber(IUserCache<Page> pageCache)
		{
			_pageCache = pageCache;
		}

		public void Handle(PageChangedEvent data)
		{
			_pageCache.RemoveAll();
		}

		public void Handle(PageDeletedEvent data)
		{
			_pageCache.RemoveAll();
		}
	}
}
