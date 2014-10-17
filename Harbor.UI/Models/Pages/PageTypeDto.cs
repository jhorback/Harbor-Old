using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageTypeDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }
		public bool isPrimaryToAdd { get; set; }

		public PageTypeDto(IPageType pageType, bool isPrimary, bool addingToParent)
		{
			key = pageType.Key;
			name = pageType.Name;
			description = addingToParent ? pageType.ContentDescription : pageType.Description;
			isPrimaryToAdd = isPrimary;
		}

		public static PageTypeDto FromPageType(IPageType pageType, bool isPrimaryToAdd, bool addingToParent)
		{
			return new PageTypeDto(pageType, isPrimaryToAdd, addingToParent);
		}
	}
}