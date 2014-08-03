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
}
