using System;
using Harbor.Domain.Pages.ContentTypes.Handlers;

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
}
