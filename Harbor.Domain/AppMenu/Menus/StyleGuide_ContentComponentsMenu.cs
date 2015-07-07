using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuide_ContentComponentsMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>()
				{
					new StyleGuideButtonsMenuLink(),
					new StyleGuideContentBoxesMenuLink(),
					new StyleGuideContentViewersMenuLink(),
					new StyleGuideDataListsMenuLink(),
					new StyleGuideDataTablesMenuLink(),
					new StyleGuideDividersMenuLink(),
					new StyleGuideMenuListsMenuLink(),
					new StyleGuideSelectionControlsMenuLink(),
					new StyleGuideTabsMenuLink(),
					new StyleGuideTextInputMenuLink(),
					new StyleGuideTilesMenuLink()
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

	public class StyleGuideButtonsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/buttons"; }
		}

		public override string Id
		{
			get { return "style-guide-buttons"; }
		}

		public override string Text
		{
			get { return "Buttons"; }
		}
	}

	public class StyleGuideContentBoxesMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/contentboxes"; }
		}

		public override string Id
		{
			get { return "style-guide-content-boxes"; }
		}

		public override string Text
		{
			get { return "Content Boxes"; }
		}
	}

	public class StyleGuideContentViewersMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/contentviewers"; }
		}

		public override string Id
		{
			get { return "style-guide-content-viewers"; }
		}

		public override string Text
		{
			get { return "Content Viewers"; }
		}
	}

	public class StyleGuideDataListsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/datalists"; }
		}

		public override string Id
		{
			get { return "style-guide-datalists"; }
		}

		public override string Text
		{
			get { return "Data Lists"; }
		}
	}

	public class StyleGuideDataTablesMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/datatables"; }
		}

		public override string Id
		{
			get { return "style-guide-datatables"; }
		}

		public override string Text
		{
			get { return "Data Tables"; }
		}
	}

	public class StyleGuideDividersMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/dividers"; }
		}

		public override string Id
		{
			get { return "style-guide-dividers"; }
		}

		public override string Text
		{
			get { return "Dividers"; }
		}
	}

	public class StyleGuideMenuListsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/menulists"; }
		}

		public override string Id
		{
			get { return "style-guide-menulists"; }
		}

		public override string Text
		{
			get { return "Menu Lists"; }
		}
	}

	public class StyleGuideSelectionControlsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/selectioncontrols"; }
		}

		public override string Id
		{
			get { return "style-guide-selectioncontrols"; }
		}

		public override string Text
		{
			get { return "Selection Controls"; }
		}
	}

	public class StyleGuideTabsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/tabs"; }
		}

		public override string Id
		{
			get { return "style-guide-tabs"; }
		}

		public override string Text
		{
			get { return "Tabs"; }
		}
	}

	public class StyleGuideTextInputMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/textinput"; }
		}

		public override string Id
		{
			get { return "style-guide-textinput"; }
		}

		public override string Text
		{
			get { return "Text Input"; }
		}
	}

	public class StyleGuideTilesMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/tiles"; }
		}

		public override string Id
		{
			get { return "style-guide-tiles"; }
		}

		public override string Text
		{
			get { return "Tiles"; }
		}
	}

}
