using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuideMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>
				{
					new StyleGuide_ApplicationDesignMenu(),
					new StyleGuide_LayoutMenu(),
					new StyleGuide_ApplicationComponentsMenu(),
					new StyleGuide_ContentComponentsMenu()
				};
			}
		}

		public override string Id
		{
			get { return "styleguide"; }
		}

		public override string Text
		{
			get { return "Style Guide"; }
		}
	}
}
