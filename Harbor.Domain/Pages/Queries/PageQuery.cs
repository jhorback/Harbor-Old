using Harbor.Domain.Caching;
using Harbor.Domain.Query;

namespace Harbor.Domain.Pages.Queries
{
	public class PageQueryParams
	{
		public int PageID { get; set; }
	}

	public interface IPageQuery : ICachedQuery<Page, PageQueryParams>
	{
		
	}

	public class PageQuery : CachedQueryBase<Page, PageQueryParams>, IPageQuery
	{
		private readonly IPageRepository _pageRepository;
		private readonly IUserCache<Page> _pageCache;

		public PageQuery(IPageRepository pageRepository, IUserCache<Page> pageCache)
		{
			_pageRepository = pageRepository;
			_pageCache = pageCache;
		}

		public override Page FromCache(PageQueryParams query)
		{
			return _pageCache.Get(query.PageID);
		}

		public override Page Execute(PageQueryParams query)
		{
			var page = _pageRepository.FindById(query.PageID);
			_pageCache.Set(query.PageID, page);
			return page;
		}
	}
}
