using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageTypeRepository : IPageTypeRepository
	{
		readonly List<PageType> pageTypes;
		Dictionary<Type, PageType> pageTypesByType = new Dictionary<Type, PageType>();

		private const string DefaultPageTypeKey = "page";

		public PageTypeRepository()
		{
			pageTypes = new List<PageType>
				{
					new PageTypes.PageListing(),
					new PageTypes.Page(),
					new PageTypes.Article(),
					new PageTypes.Product()
				};

			foreach (var type in pageTypes)
			{
				pageTypesByType.Add(type.GetType(), type);
			}
		}

		public IDictionary<string, List<PageType>> GetPageTypesToAdd()
		{
			var dict = new Dictionary<string, List<PageType>>
			{
				{ "primary", pageTypes.Where(p => p.AddPageTypeFilter.IsPrimary).ToList() },
				{ "other", pageTypes.Where(p => !p.AddPageTypeFilter.IsPrimary).ToList() }
			};
			return dict;
		}

		public IDictionary<string, List<PageType>> GetPageTypesToAdd(string parentPageTypeKey)
		{
			var pageType = GetPageType(parentPageTypeKey);
			if (pageType == null)
			{
				return GetPageTypesToAdd();
			}

			// determine all of the included page types based on the include/exclude lists
			var included = new List<PageType>();
			if (pageType.AddPageTypeFilter.IncludePageTypes.Count > 0)
			{
				foreach (var include in pageType.AddPageTypeFilter.IncludePageTypes)
				{
					included.Add(pageTypesByType[include]);
				}
			}
			else if (pageType.AddPageTypeFilter.ExcludePageTypes.Count > 0)
			{
				included = pageTypes;
				foreach (var exclude in pageType.AddPageTypeFilter.ExcludePageTypes)
				{
					included.Remove(pageTypesByType[exclude]);
				}
			}
			else
			{
				included = pageTypes;
			}


			// determine the primary and other based on the suggested list
			Dictionary<string, List<PageType>> dict;
			if (pageType.AddPageTypeFilter.SuggestedPageTypes.Count > 0)
			{
				var suggested = pageType.AddPageTypeFilter.SuggestedPageTypes;
				dict = new Dictionary<string, List<PageType>>
				{
					{ "primary", included.Where(p => suggested.Contains(p.GetType())).ToList() },
					{ "other", included.Where(p => !suggested.Contains(p.GetType())).ToList() }
				};
			}
			else
			{
				dict = new Dictionary<string, List<PageType>>
				{
					{ "primary", included },
					{ "other", new List<PageType>() }
				};
			}

			return dict;
		}


		public IEnumerable<PageType> GetPageTypes()
		{
			return pageTypes;
		}

		public PageType GetPageType(string key, bool useDefault = false)
		{
			var pageType = pageTypes.FirstOrDefault(pt => pt.Key == key);
			if (pageType == null && useDefault == true)
			{
				pageType = pageTypes.FirstOrDefault(pt => pt.Key == DefaultPageTypeKey);
			}
			return pageType;
		}
	}
}
