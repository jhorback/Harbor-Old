using System.Collections.Generic;
using Harbor.Domain.Security;

namespace Harbor.Domain.AppMenu.Menus
{
	public class SystemSettingsMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>
				{
					// new CurrentSiteMenuLink - would need a new page for this
					new WebsiteUsersMenuLink(),
					new PageTypesMenuLink()
				};
			}
		}

		public override string Id
		{
			get { return "system-settings"; }
		}

		public override string Text
		{
			get { return "System Settings"; }
		}
	}

	public class WebsiteUsersMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/user/admin"; }
		}

		public override string Id
		{
			get { return "website-users"; }
		}

		public override string Text
		{
			get { return "Website Users"; }
		}

		public override bool HasPermission(MenuItemContext context)
		{
			return context.User.HasPermission(UserFeature.Users);
		}
	}

	public class PageTypesMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/user/pagetypeadmin"; }
		}

		public override string Id
		{
			get { return "page-types"; }
		}

		public override string Text
		{
			get { return "Page Types"; }
		}

		public override bool HasPermission(MenuItemContext context)
		{
			return context.User.HasPermission(UserFeature.Users);
		}
	}
}
