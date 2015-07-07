using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuide_ApplicationComponentsMenu : Menu
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

	/*
			StyleGuide_ApplicationComponentsMenu
				Cards
				Dialogs
				FABs
				Feedbacks
				Menus
				Popups
				Toolbars*/
}
