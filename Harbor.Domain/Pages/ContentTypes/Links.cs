using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Links : ContentType
	{
		public override Type HandlerType
		{
			get { return typeof(AsideHandler<Content.Links>); }
		}
	}

	//public class LinksHandler : PageLayoutContentHandler
	//{
	//	public LinksHandler(Page page) : base(page)
	//	{
	//	}

	//	public override object GetLayoutContent()
	//	{
	//		return GetAside<Content.Links>();
	//	}
	//}

	public class AsideHandler<T> : PageLayoutContentHandler
	{
		public AsideHandler(Page page) : base(page)
		{
		}

		public override object GetLayoutContent()
		{
			return GetAside<T>();
		}
	}

	public class HeaderHandler<T> : PageLayoutContentHandler
	{
		public HeaderHandler(Page page) : base(page)
		{
		}

		public override object GetLayoutContent()
		{
			return GetHeader<T>();
		}
	}
}
