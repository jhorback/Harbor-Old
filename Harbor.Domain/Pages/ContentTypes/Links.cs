using System;
using Harbor.Domain.Pages.ContentTypes.Handlers;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Links : ContentType
	{
		public override Type HandlerType
		{
			// get { return typeof(AsideHandler<Content.Links>); }
			get { return typeof(LinksHandler); }
		}
	}
}
