using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageTypeRepository : IPageTypeRepository
	{
		readonly List<IPageType> _pageTypes;
		Dictionary<Type, IPageType> pageTypesByType = new Dictionary<Type, IPageType>();

		private const string DefaultPageTypeKey = "page";

		public PageTypeRepository(IEnumerable<IPageType> pageTypes)
		{
			_pageTypes = pageTypes.ToList();
			foreach (var type in _pageTypes)
			{
				pageTypesByType.Add(type.GetType(), type);
			}
		}

		public IDictionary<string, List<IPageType>> GetPageTypesToAdd()
		{
			var dict = new Dictionary<string, List<IPageType>>
			{
				{ "primary", _pageTypes.Where(p => p.AddPageTypeFilter.IsPrimary).ToList() },
				{ "other", _pageTypes.Where(p => !p.AddPageTypeFilter.IsPrimary).ToList() }
			};
			return dict;
		}

		public IDictionary<string, List<IPageType>> GetPageTypesToAdd(string parentPageTypeKey)
		{
			var pageType = GetPageType(parentPageTypeKey);
			if (pageType == null)
			{
				return GetPageTypesToAdd();
			}

			// determine all of the included page types based on the include/exclude lists
			var included = new List<IPageType>();
			if (pageType.AddPageTypeFilter.IncludeTypes.Count > 0)
			{
				foreach (var include in pageType.AddPageTypeFilter.IncludeTypes)
				{
					included.Add(pageTypesByType[include]);
				}
			}
			else if (pageType.AddPageTypeFilter.ExcludeTypes.Count > 0)
			{
				included = _pageTypes;
				foreach (var exclude in pageType.AddPageTypeFilter.ExcludeTypes)
				{
					included.Remove(pageTypesByType[exclude]);
				}
			}
			else
			{
				included = _pageTypes;
			}


			// determine the primary and other based on the suggested list
			Dictionary<string, List<IPageType>> dict;
			if (pageType.AddPageTypeFilter.SuggestedTypes.Count > 0)
			{
				var suggested = pageType.AddPageTypeFilter.SuggestedTypes;
				dict = new Dictionary<string, List<IPageType>>
				{
					{ "primary", included.Where(p => suggested.Contains(p.GetType())).ToList() },
					{ "other", included.Where(p => !suggested.Contains(p.GetType())).ToList() }
				};
			}
			else
			{
				dict = new Dictionary<string, List<IPageType>>
				{
					{ "primary", included },
					{ "other", new List<IPageType>() }
				};
			}

			return dict;
		}


		public IEnumerable<IPageType> GetPageTypes()
		{
			return _pageTypes;
		}

		public IPageType GetPageType(string key, bool useDefault = false)
		{
			var pageType = _pageTypes.FirstOrDefault(pt => pt.Key == key);
			if (pageType == null && useDefault == true)
			{
				pageType = _pageTypes.FirstOrDefault(pt => pt.Key == DefaultPageTypeKey);
			}
			return pageType;
		}
	}
}
