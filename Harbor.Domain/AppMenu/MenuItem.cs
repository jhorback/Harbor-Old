using System.Collections.Generic;
using Harbor.Domain.Security;

namespace Harbor.Domain.AppMenu
{
	public class Menu
	{
		public Menu(string id)
		{
			Id = id;
			Feature = UserFeature.None;
		}

		public string Id { get; set; }
		public List<MenuItem> Items { get; set; }
		public UserFeature Feature { get; set; }
	}

	public class MenuItem
	{
		public MenuItem(string id)
		{
			Id = id;
			Feature = UserFeature.None;
		}

		public string Id { get; set; }
		public string Text { get; set; }
		public string Url { get; set; }
		public UserFeature Feature { get; set; }
	}

	public class MenuRepository
	{
		public MenuRepository()
		{
			var rootMenu = new Menu("root");
			rootMenu.Items.Add(new MenuItem("pages")
			{
				Text = "Pages",
				Url = "~/user/pages",
				Feature = UserFeature.Pages
			});

			rootMenu.Items.Add(new MenuItem("files")
			{
				Text = "Files",
				Url = "~/user/files",
				Feature = UserFeature.Files
			});

			rootMenu.Items.Add(new MenuItem("account")
			{
				Text = "Your Account",
				Url = "~/user/account",
			});

			rootMenu.Items.Add(new MenuItem("site-settings")
			{
				Text = "Website Settings",
				Url = "~/user/settings",
				Feature = UserFeature.SiteSettings
			});

			rootMenu.Items.Add(new MenuItem("system-settings")
			{
				Text = "System Settings",
				Url = "~/user/settings",
				Feature = UserFeature.SystemSettings
			});

			

			/*
System Settings
	Current site
		site name, theme, footer
	Website users
	Page types
Support
	Style Guide
		Application Design
			Typography
			Color
			Icons
			Elevations
			Handling errors
			Animations
		Layouts
			Page Layout 1
			Scaffolding
		Application Components
			Cards
			Dialogs
			FABs
			Feedbacks
			Menus
			Popups
			Toolbars
		Content Components
			Buttons
			Content Boxes
			Content Viewers
			Data Lists
			Data Tables
			Dividers
			Menu Lists
			Selection controls
			Tabs
			Text Input
			Tiles
	JavaScript Packages
	Elmah
	Analytics (not configured)
About v10.0 preview
*/
		}
	}
}
