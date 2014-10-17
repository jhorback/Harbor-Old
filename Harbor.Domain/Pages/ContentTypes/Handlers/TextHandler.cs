using System.Collections.Generic;

namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class TextHandler : TemplateContentHandler
	{
		public TextHandler(Page page, TemplateUic uic)
			: base(page, uic)
		{
		}

		public override object GetTemplateContent()
		{
			return new Content.Text(GetProperty("text"));
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			yield break;
		}

		public override IEnumerable<string> DeclarePropertyNames()
		{
			yield return UICPropertyName("text");
		}
	}
}
