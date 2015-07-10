using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuide_LayoutMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>()
				{
					new StyleGuidePageLayoutMenuLink(),
					new StyleGuideScaffoldingMenuLink()
				};
			}
		}

		public override string Id
		{
			get { return "styleguide-layout"; }
		}

		public override string Text
		{
			get { return "Layout"; }
		}
	}

	public class StyleGuidePageLayoutMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/pagelayout"; }
		}

		public override string Id
		{
			get { return "style-guide-pagelayout"; }
		}

		public override string Text
		{
			get { return "Page Layout"; }
		}
	}

	public class StyleGuideScaffoldingMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/scaffolding"; }
		}

		public override string Id
		{
			get { return "style-guide-scaffolding"; }
		}

		public override string Text
		{
			get { return "Scaffolding"; }
		}
	}
}
