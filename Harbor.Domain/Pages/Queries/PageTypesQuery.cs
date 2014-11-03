using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Caching;
using Harbor.Domain.Query;

namespace Harbor.Domain.Pages.Queries
{
	public class PageTypesQueryParams : CacheableQueryParams
	{
		public string ParentPageTypeKey { get; set; }
		public string LayoutPageTypeKey { get; set; }
	}

	public interface IPageTypesQuery : ICachedQuery<IEnumerable<PageTypeDto>, PageTypesQueryParams>
	{
		
	}

	public class PageTypesQuery : CachedQueryBase<IEnumerable<PageTypeDto>, PageTypesQueryParams>, IPageTypesQuery
	{
		private readonly IPageTypeRepository _pageTypeRepository;
		private readonly GlobalCache<IEnumerable<PageTypeDto>> _pageTypeGlobalCache;

		public PageTypesQuery(IPageTypeRepository pageTypeRepository, GlobalCache<IEnumerable<PageTypeDto>> pageTypeGlobalCache)
		{
			_pageTypeRepository = pageTypeRepository;
			_pageTypeGlobalCache = pageTypeGlobalCache;
		}

		public override IEnumerable<PageTypeDto> FromCache(PageTypesQueryParams query)
		{
			return _pageTypeGlobalCache.Get(query.GetCacheKey());
		}

		public override IEnumerable<PageTypeDto> Execute(PageTypesQueryParams query)
		{
			var types = getPageTypes(query).ToList();
			_pageTypeGlobalCache.Set(query.GetCacheKey(), types);
			return types;
		}

		IEnumerable<PageTypeDto> getPageTypes(PageTypesQueryParams query)
		{
			var parentPageTypeKey = query.LayoutPageTypeKey ?? query.ParentPageTypeKey;
			var pageTypes = _pageTypeRepository.GetPageTypesToAdd(parentPageTypeKey);
			var addingToLayout = !string.IsNullOrEmpty(query.LayoutPageTypeKey);
			foreach (var type in pageTypes["primary"])
			{
				yield return PageTypeDto.FromPageType(type, isPrimaryToAdd: true, addingToLayout: addingToLayout);
			}

			foreach (var type in pageTypes["other"])
			{
				yield return PageTypeDto.FromPageType(type, isPrimaryToAdd: false, addingToLayout: addingToLayout);
			}
		}
	}
}
