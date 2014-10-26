using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Caching;
using Harbor.Domain.Query;

namespace Harbor.Domain.Pages.PageTypeAdmin.Queries
{
	public class PageTypeQuery : CachedQueryBase<IEnumerable<PageTypeDto>>, IPageTypeQuery
	{
		private readonly IPageTypeRepository _pageTypeRepository;
		private readonly IGlobalCache<IEnumerable<PageTypeDto>> _pageTypeCache;

		Dictionary<string, IPageType> pageTypesByKey = new Dictionary<string, IPageType>();

		public PageTypeQuery(IPageTypeRepository pageTypeRepository, IGlobalCache<IEnumerable<PageTypeDto>> pageTypeCache)
		{
			_pageTypeRepository = pageTypeRepository;
			_pageTypeCache = pageTypeCache;
		}

		public override IEnumerable<PageTypeDto> FromCache()
		{
			return _pageTypeCache.Get();
		}

		public override IEnumerable<PageTypeDto> Execute()
		{
			var pageTypes = _pageTypeRepository.GetPageTypes().ToList();
			foreach (var pageType in pageTypes)
			{
				pageTypesByKey.Add(pageType.GetType().FullName, pageType as IPageType);
			}

			var pageTypeDtos = pageTypes.Select(pt => new PageTypeDto
			{
				key = pt.Key,
				name = pt.Name,
				description = pt.Description,
				contentDescription = pt.ContentDescription,
				addContentFilterDescription = getAddTypeFilgerDescription(pt.AddContentTypeFilter),
				addPageFilterDescription = getPageFilterDescription(pt.AddPageTypeFilter)
			}).ToList();

			_pageTypeCache.Set(pageTypeDtos);

			return pageTypeDtos;
		}

		string getAddTypeFilgerDescription(AddTypeFilter filter)
		{
			var description = "";

			var suggested = new List<String>();
			var include = new List<string();
			var exclude = new List<string>();
			
			foreach (var type in filter.SuggestedTypes)
			{
				var suggestedType = pageTypesByKey[type.FullName];
				suggested.Add(suggestedType.Name + "(" + suggestedType.Key + ")");
			}

			foreach (var type in filter.IncludeTypes)
			{
				var includeType = pageTypesByKey[type.FullName];
				include.Add(includeType.Name + "(" + includeType.Key + ")");
			}

			foreach (var type in filter.ExcludeTypes)
			{
				var excludeType = pageTypesByKey[type.FullName];
				exclude.Add(excludeType.Name + "(" + excludeType.Key + ")");
			}

			if (suggested.Count > 0)
			{
				description += "Suggested: " + string.Join(", ", suggested);
			}

			if (include.Count > 0)
			{
				description += "Include: " + string.Join(", ", include);
			}
			else if (exclude.Count > 0)
			{
				description += "Exclude: " + string.Join(", ", exclude);
			}

			return description;
		}

		string getPageFilterDescription(AddPageTypeFilter filter)
		{
			var description = getAddTypeFilgerDescription(filter);
			if (filter.IsPrimary)
			{
				description = "Primary! " + description;
			}
			return description;
		}
	}
}
