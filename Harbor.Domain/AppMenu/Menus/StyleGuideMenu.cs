using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuideMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>()
				{

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

	/* StyleGuideMenu
 *	ApplicationDesignMenu
 *	LayoutMenu
 *	ApplicationComponentsMenu
 *	ContentComponentsMenu
 * */
}
