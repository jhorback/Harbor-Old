using System.Collections.Generic;

namespace Harbor.Domain.AppMenu.Menus
{
	public class StyleGuide_ApplicationDesignMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>()
				{
					new StyleGuideTypographyMenuLink(),
					new StyleGuideColorMenuLink(),
					new StyleGuideIconsMenuLink(),
					new StyleGuideElevationsMenuLink(),
					new StyleGuideHandlingErrorsMenuLink(),
					new StyleGuideAnimationsMenuLink(),
					new StyleGuideClassReferenceMenuLink()
				};
			}
		}

		public override string Id
		{
			get { return "styleguide-application-design"; }
		}

		public override string Text
		{
			get { return "Application Design"; }
		}
	}

	public class StyleGuideTypographyMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/typography"; }
		}

		public override string Id
		{
			get { return "style-guide-typography"; }
		}

		public override string Text
		{
			get { return "Typography"; }
		}
	}

	public class StyleGuideColorMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/color"; }
		}

		public override string Id
		{
			get { return "style-guide-color"; }
		}

		public override string Text
		{
			get { return "Color"; }
		}
	}

	public class StyleGuideIconsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/icons"; }
		}

		public override string Id
		{
			get { return "style-guide-icons"; }
		}

		public override string Text
		{
			get { return "Icons"; }
		}
	}

	public class StyleGuideElevationsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/elevations"; }
		}

		public override string Id
		{
			get { return "style-guide-elevations"; }
		}

		public override string Text
		{
			get { return "Elevations"; }
		}
	}

	public class StyleGuideHandlingErrorsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/handlingerrors"; }
		}

		public override string Id
		{
			get { return "style-guide-handlingerrors"; }
		}

		public override string Text
		{
			get { return "Handling Errors"; }
		}
	}

	public class StyleGuideAnimationsMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/animations"; }
		}

		public override string Id
		{
			get { return "style-guide-animations"; }
		}

		public override string Text
		{
			get { return "Animations"; }
		}
	}

	public class StyleGuideClassReferenceMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/styleguide/classreference"; }
		}

		public override string Id
		{
			get { return "style-guide-class-reference"; }
		}

		public override string Text
		{
			get { return "Class Reference"; }
		}
	}
}
