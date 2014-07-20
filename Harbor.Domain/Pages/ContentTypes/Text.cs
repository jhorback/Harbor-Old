using System;
using System.Collections.Generic;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Text : TemplateContentType
	{
		public override string Name
		{
			get { return "Text"; }
		}

		public override string Description
		{
			get { return "A rich text editor."; }
		}

		public override Type HandlerType
		{
			get { return typeof(TextHandler); }
		}
	}

	public class TextHandler : TemplateContentHandler
	{
		public TextHandler(Page page, TemplateUic uic) : base(page, uic)
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
	}
}
