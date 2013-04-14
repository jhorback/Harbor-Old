using System;

namespace Harbor.Domain.Pages.Components
{
	public class PageLink : ContentComponent
	{
		public const string KEY = "pageLink";

		public override string Key
		{
			get { return KEY; }
		}

		public override string Name
		{
			get
			{
				return "Page Link";
			}
		}

		public override string Description
		{
			get
			{
				return "Add a link to another internal page.";
			}
		}

		public override Type PageComponent
		{
			get { return typeof(PageComponents.PageLink); }
		}
	}
}
