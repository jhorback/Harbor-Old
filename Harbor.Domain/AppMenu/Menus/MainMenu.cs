using System.Collections.Generic;
using Harbor.Domain.App;
using Harbor.Domain.Security;

namespace Harbor.Domain.AppMenu.Menus
{
	public class MainMenu : Menu
	{
		public override List<MenuItem> Items
		{
			get
			{
				return new List<MenuItem>
				{
					new PagesMenuLink(),
					new FilesMenuLink(),
					new AccountMenuLink(),
					new WebsiteSettingsLink(),
					new SystemSettingsMenu(),
					new SupportMenu(),
					new AboutLink()
				};
			}
		}

		public override string Id
		{
			get { return "rootMenu"; }
		}

		public override string Text
		{
			get { return "Main Menu"; }
		}
	}


	public class PagesMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/user/pages"; }
		}

		public override string Id
		{
			get { return "pages"; }
		}

		public override string Text
		{
			get { return "Pages"; }
		}

		public override bool HasPermission(MenuItemContext context)
		{
			return context.User.HasPermission(UserFeature.Pages);
		}
	}


	public class FilesMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/user/files"; }
		}

		public override string Id
		{
			get { return "files"; }
		}

		public override string Text
		{
			get { return "Files"; }
		}

		public override bool HasPermission(MenuItemContext context)
		{
			return context.User.HasPermission(UserFeature.Files);
		}
	}


	public class AccountMenuLink : MenuLink
	{
		public override string Url
		{
			get { return "~/user/account"; }
		}

		public override string Id
		{
			get { return "account"; }
		}

		public override string Text
		{
			get { return "Your Account"; }
		}
	}


	public class WebsiteSettingsLink : MenuLink
	{
		public override string Url
		{
			get { return "~/user/settings"; }
		}

		public override string Id
		{
			get { return "website-settings"; }
		}

		public override string Text
		{
			get { return "Website Settings"; }
		}

		public override bool HasPermission(MenuItemContext context)
		{
			return context.User.HasPermission(UserFeature.SiteSettings);
		}
	}


	public class AboutLink : DynamicMenuLink
	{
		public override string Url
		{
			get { return "~/user/settings"; }
		}

		public override string Id
		{
			get { return "website-settings"; }
		}
	
		public override string GetText(MenuItemContext context)
		{
			var harborApp = context.GetDependency<IHarborAppRepository>().GetApp();
			return "About version " + harborApp.Version;
		}
	}
}
