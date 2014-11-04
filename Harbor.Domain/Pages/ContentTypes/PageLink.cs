using System;
using Harbor.Domain.Pages.ContentTypes.Handlers;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class PageLink : TemplateContentType
	{
		public override string Name
		{
			get { return "Page Link"; }
		}

		public override string Description
		{
			get { return "Add a link to another internal page."; }
		}

		public override Type HandlerType
		{
			get { return typeof(PageLinkHandler); }
		}
	}
}