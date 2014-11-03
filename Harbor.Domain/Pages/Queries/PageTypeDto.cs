
namespace Harbor.Domain.Pages.Queries
{
	public class PageTypeDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }
		public bool isPrimaryToAdd { get; set; }

		public PageTypeDto(IPageType pageType, bool isPrimary, bool addingToLayout)
		{
			key = pageType.Key;
			name = pageType.Name;
			description = addingToLayout ? pageType.ContentDescription : pageType.Description;
			isPrimaryToAdd = isPrimary;
		}

		public static PageTypeDto FromPageType(IPageType pageType, bool isPrimaryToAdd, bool addingToLayout)
		{
			return new PageTypeDto(pageType, isPrimaryToAdd, addingToLayout);
		}
	}
}
