using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageComponentDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }
		public bool isPrimaryToAdd { get; set; }

		public PageComponentDto()
		{
		}

		public PageComponentDto(TemplateContentType pageContentType, bool isPrimaryToAdd)
		{
			key = pageContentType.Key;
			name = pageContentType.Name;
			description = pageContentType.Description;
			isPrimaryToAdd = isPrimaryToAdd;
		}

		public static PageComponentDto FromPageContentType(TemplateContentType pageContentType, bool isPrimaryToAdd)
		{
			return new PageComponentDto(pageContentType, isPrimaryToAdd);
		}
	}
}