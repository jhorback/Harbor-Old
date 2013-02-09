
namespace Harbor.UI.Models.Theming
{
	public static class ThemeTable
	{
		static ThemeTable()
		{
			Themes = new ThemeCollection();
			ThemesLocation = "~/content/themes/";
		}

		public static ThemeCollection Themes { get; private set; }

		/// <summary>
		/// The virtual path of the directory where the themes are located.
		/// </summary>
		public static string ThemesLocation { get; set; }
	}
}