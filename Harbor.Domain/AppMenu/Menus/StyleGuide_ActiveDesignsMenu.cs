using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuide_ActiveDesignsMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>
				{
					new StyleGuideTestApp(),
				};
			}
		}

		public override string Id
		{
			get { return "styleguide-active-designs"; }
		}

		public override string Text
		{
			get { return "Active Designs"; }
		}
	}

	public class StyleGuideTestApp : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/testapp"; }
		}

		public override string Id
		{
			get { return "style-guide-test-app"; }
		}

		public override string Text
		{
			get { return "Test App"; }
		}
	}
}
