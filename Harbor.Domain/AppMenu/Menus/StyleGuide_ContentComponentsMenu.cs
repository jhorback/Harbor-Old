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
		StyleGuide_ContentComponentsMenu
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
			Tiles*/
}
