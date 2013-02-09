
using System.Web.Optimization;

namespace Harbor.UI.Models.Theming
{
	public class Theme : ITheme
	{
		public Theme(string name)
		{
			Name = name;
			
			SiteStyleBundle = new StyleBundle(ThemeTable.ThemesLocation + name + "/site.theme.min.css")
				.Include(ThemeTable.ThemesLocation + name + "/theme.css");
		}

		public string Name { get; private set; }

		public Bundle SiteStyleBundle { get; private set; }
		
		public string FavIcon { get; private set; }
		public string FavIconPng { get; private set; }
		public string TouchIcon { get; private set; }
		public string TileIcon { get; private set; }
		public string TileColor { get; private set; }
	}
}