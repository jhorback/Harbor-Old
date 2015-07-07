using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuide_ApplicationComponentsMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>
				{
					new StyleGuideCardsMenuLink(),
					new StyleGuideDialogsMenuLink(),
					new StyleGuideFabsMenuLink(),
					new StyleGuideFeedbacksMenuLink(),
					new StyleGuideMenusMenuLink(),
					new StyleGuidePopupsMenuLink(),
					new StyleGuideToolbarsMenuLink()
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

	public class StyleGuideCardsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/cards"; }
		}

		public override string Id
		{
			get { return "style-guide-cards"; }
		}

		public override string Text
		{
			get { return "Cards"; }
		}
	}

	public class StyleGuideDialogsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/dialogs"; }
		}

		public override string Id
		{
			get { return "style-guide-dialogs"; }
		}

		public override string Text
		{
			get { return "Dialogs"; }
		}
	}

	public class StyleGuideFabsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/fabs"; }
		}

		public override string Id
		{
			get { return "style-guide-fabs"; }
		}

		public override string Text
		{
			get { return "FABs"; }
		}
	}

	public class StyleGuideFeedbacksMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/feedbacks"; }
		}

		public override string Id
		{
			get { return "style-guide-feedbacks"; }
		}

		public override string Text
		{
			get { return "Feedbacks"; }
		}
	}

	public class StyleGuideMenusMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/menus"; }
		}

		public override string Id
		{
			get { return "style-guide-menus"; }
		}

		public override string Text
		{
			get { return "Menus"; }
		}
	}

	public class StyleGuidePopupsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/popups"; }
		}

		public override string Id
		{
			get { return "style-guide-popups"; }
		}

		public override string Text
		{
			get { return "Popups"; }
		}
	}

	public class StyleGuideToolbarsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/toolbars"; }
		}

		public override string Id
		{
			get { return "style-guide-toolbars"; }
		}

		public override string Text
		{
			get { return "Toolbars"; }
		}
	}
}
