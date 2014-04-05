using System.Collections.Generic;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class TemplateDto
	{
		public int pageID { get; set; }
		public List<Template.Uic> content { get; set; }
		public string defaultContentClassName { get; set; }
		public int componentCounter { get; set; }

		public static implicit operator TemplateDto(Template template)
		{
			return FromTemplate(template);
		}

		public static implicit operator Template(TemplateDto template)
		{
			return ToTemplate(template);
		}

		public static TemplateDto FromTemplate(Template template)
		{
			return new TemplateDto
			{
				pageID = template.PageID,
				content = template.Content,
				defaultContentClassName = template.DefaultContentClassName,
				componentCounter = template.ComponentCounter
			};
		}

		public static Template ToTemplate(TemplateDto template)
		{
			return new Template
			{
				PageID = template.pageID,
				Content = template.content,
				DefaultContentClassName = template.defaultContentClassName,
				ComponentCounter = template.componentCounter
			};
		}
	}
}