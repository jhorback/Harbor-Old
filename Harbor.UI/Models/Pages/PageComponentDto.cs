using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageComponentDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }

		public PageComponentDto()
		{
		}

		public PageComponentDto(TemplateContentType pageContentType)
		{
			key = pageContentType.Key;
			name = pageContentType.Name;
			description = pageContentType.Description;
		}

		public static PageComponentDto FromPageContentType(TemplateContentType pageContentType)
		{
			return new PageComponentDto(pageContentType);
		}
	}
}