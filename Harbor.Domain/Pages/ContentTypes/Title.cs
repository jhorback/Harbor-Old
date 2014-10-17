using System;
using Harbor.Domain.Pages.ContentTypes.Handlers;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Title : ContentType
	{
		public override Type HandlerType
		{
			get { return typeof(TitleHandler); }
		}
	}
}
