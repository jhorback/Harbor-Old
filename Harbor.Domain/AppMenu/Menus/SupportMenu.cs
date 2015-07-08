using System.Collections.Generic;
using Harbor.Domain.App;
using Harbor.Domain.Security;

namespace Harbor.Domain.AppMenu.Menus
{
    public class SupportMenu : Menu
    {
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>
				{
					new StyleGuideMenu(),
					new JavaScriptPackagesMenuLink(),
					new ElmahMenuLink(),
					new AnalyticsMenuLink()
				};
			}
		}

		public override string Id
		{
			get { return "support"; }
		}

		public override string Text
		{
			get { return "Support"; }
		}

	    public override bool HasPermission(MenuItemContext context)
	    {
		    return context.User.HasPermission(UserFeature.SystemSettings);
	    }
    }

	public class JavaScriptPackagesMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/home/javascriptpackages"; }
		}

		public override string Id
		{
			get { return "javascript-packages"; }
		}

		public override string Text
		{
			get { return "JavaScript Packages"; }
		}
	}

	public class ElmahMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/elmah.axd"; }
		}

		public override string Id
		{
			get { return "elmah"; }
		}

		public override string Text
		{
			get { return "Elmah (http errors)"; }
		}
	}

	public class AnalyticsMenuLink : DynamicMenuLink
	{
		public override string Url
		{
			get { return "https://www.google.com/analytics"; }
		}

		public override string Id
		{
			get { return "analytics"; }
		}

		public override string GetText(MenuItemContext context)
		{
			var harborApp = context.GetDependency<IHarborAppRepository>().GetApp();
			if (string.IsNullOrEmpty(harborApp.GoogleAnalyticsAccount))
			{
				return "Google Analytics (not configured)";
			}

			return "Google Analytics " + harborApp.GoogleAnalyticsAccount;
		}
	}
}
