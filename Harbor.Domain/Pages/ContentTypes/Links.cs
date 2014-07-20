using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Links : ContentType
	{
		public override Type HandlerType
		{
			get { return typeof(LinksHandler); }
		}
	}

	public class LinksHandler : PageLayoutContentHandler
	{
		public LinksHandler(Page page) : base(page)
		{
		}

		public override object GetLayoutContent()
		{
			return GetAside<Content.Links>();
		}

		public override void SetLayoutContent()
		{
			// throw new NotImplementedException();
		}
	}
}
