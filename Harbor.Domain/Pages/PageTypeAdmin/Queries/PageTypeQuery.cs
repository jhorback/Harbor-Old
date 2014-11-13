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
		private readonly IContentTypeRepository _contentTypeRepository;

		readonly Dictionary<string, IPageType> pageTypesByKey = new Dictionary<string, IPageType>();
		readonly Dictionary<string, TemplateContentType> contentTypesByKey = new Dictionary<string, TemplateContentType>(); 

		public PageTypeQuery(
			IPageTypeRepository pageTypeRepository,
			IGlobalCache<IEnumerable<PageTypeDto>> pageTypeCache,
			IContentTypeRepository contentTypeRepository
			)
		{
			_pageTypeRepository = pageTypeRepository;
			_pageTypeCache = pageTypeCache;
			_contentTypeRepository = contentTypeRepository;
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
				pageTypesByKey.Add(pageType.GetType().FullName, pageType);
			}

			var contentTypes = _contentTypeRepository.GetAllTemplateContentTypes();
			foreach (var contentType in contentTypes)
			{
				contentTypesByKey.Add(contentType.GetType().FullName, contentType);
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
			var description = new List<string>();
			var suggested = new List<String>();
			var include = new List<string>();
			var exclude = new List<string>();
			
			foreach (var type in filter.SuggestedTypes)
			{
				if (filter is AddContentTypeFilter)
				{
					var suggestedType = contentTypesByKey[type.FullName];
					suggested.Add(suggestedType.Name); // + " (" + suggestedType.Key + ")");
				}
				else
				{
					var suggestedType = pageTypesByKey[type.FullName];
					suggested.Add(suggestedType.Name); // + " (" + suggestedType.Key + ")");
				}
			}

			foreach (var type in filter.IncludeTypes)
			{
				if (filter is AddContentTypeFilter)
				{
					var includeType = contentTypesByKey[type.FullName];
					include.Add(includeType.Name); // + " (" + includeType.Key + ")");
				}
				else
				{
					var includeType = pageTypesByKey[type.FullName];
					include.Add(includeType.Name); // + " (" + includeType.Key + ")");
				}
			}

			foreach (var type in filter.ExcludeTypes)
			{
				if (filter is AddContentTypeFilter)
				{
					var excludeType = contentTypesByKey[type.FullName];
					exclude.Add(excludeType.Name); // + " (" + excludeType.Key + ")");
				}
				else
				{
					var excludeType = pageTypesByKey[type.FullName];
					exclude.Add(excludeType.Name); // + " (" + excludeType.Key + ")");
				}
			}

			if (suggested.Count > 0)
			{
				description.Add("Suggested: " + string.Join(", ", suggested));
			}

			if (include.Count > 0)
			{
				description.Add("Include: " + string.Join(", ", include));
			}
			else if (exclude.Count > 0)
			{
				description.Add("Exclude: " + string.Join(", ", exclude));
			}

			return string.Join("<br>", description);
		}

		string getPageFilterDescription(AddPageTypeFilter filter)
		{
			var description = getAddTypeFilgerDescription(filter);
			if (filter.IsPrimary)
			{
				description = "<b>" + description + "</b>";
			}
			return description;
		}
	}
}
