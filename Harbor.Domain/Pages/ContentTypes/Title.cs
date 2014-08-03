
using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Title : ContentType
	{
		public override Type HandlerType
		{
			get { return typeof(TitleHandler); }
		}
	}

	public class TitleHandler : PageLayoutContentHandler
	{
		public TitleHandler(Page page) : base(page)
		{
		}

		public override object GetLayoutContent()
		{
			return null;
		}
	}
}
