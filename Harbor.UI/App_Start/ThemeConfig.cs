using System.Web.Optimization;
using Harbor.UI.Models.Theming;

namespace Harbor.UI
{
	public class ThemeConfig
	{
		public static void RegisterThemes(ThemeCollection themes, BundleCollection bundles)
		{
			themes.Bundles = bundles;

			themes.Add(new Theme("default"));
			themes.Add(new Theme("bjroyster"));
			themes.Add(new Theme("bjr too"));
		}
	}
}