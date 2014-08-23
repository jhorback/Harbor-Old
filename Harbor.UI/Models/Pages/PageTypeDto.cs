using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageTypeDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }
		public string contentDescription { get; set; }
		public bool isPrimaryToAdd { get; set; }

		public PageTypeDto(PageType pageType, bool isPrimary)
		{
			key = pageType.Key;
			name = pageType.Name;
			description = pageType.Description;
			contentDescription = pageType.ContentDescription;
			isPrimaryToAdd = isPrimary;
		}

		public static PageTypeDto FromPageType(PageType pageType, bool isPrimaryToAdd)
		{
			return new PageTypeDto(pageType, isPrimaryToAdd);
		}
	}
}