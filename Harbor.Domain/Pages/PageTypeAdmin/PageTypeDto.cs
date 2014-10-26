
namespace Harbor.Domain.Pages.PageTypeAdmin
{
	public class PageTypeDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }
		public string contentDescription { get; set; }
		public string addContentFilterDescription { get; set; }
		public string addPageFilterDescription { get; set; }
		public bool isPrimaryToAdd { get; set; }

		// the query does the mapping
		//public PageTypeDto(IPageType pageType, bool isPrimary, bool addingToParent)
		//{
		//	key = pageType.Key;
		//	name = pageType.Name;
		//	description = pageType.Description;
		//	contentDescription = pageType.ContentDescription;
		//	isPrimaryToAdd = isPrimary;

		//	// jch! - create a query for page types. SystemPageTypesQuery - returns all page types
		//	/* NEED TO SET THE addContentFilter and the addPageFilterDescription
		//	 * */
		//}

		//public static PageTypeDto FromPageType(IPageType pageType, bool isPrimaryToAdd, bool addingToParent)
		//{
		//	return new PageTypeDto(pageType, isPrimaryToAdd, addingToParent);
		//}
	}
}
