using System.Text;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Optimization;
using Harbor.Domain.App;
using Harbor.UI.Models.Theming;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		/// <summary>
		/// Gets the current theme from the web config and returns the html based on the resources registered with the <see cref="ThemeTable"/>.
		/// </summary>
		/// <param name="helper"></param>
		/// <returns></returns>
		public static MvcHtmlString CurrentTheme(this HtmlHelper helper)
		{
			var appRep = DependencyResolver.Current.GetService<IHarborAppRepository>();

			var currentThemeName = appRep.GetApp().Theme;
			var currentTheme = ThemeTable.Themes.GetTheme(currentThemeName);
			if (currentTheme == null)
			{
				currentTheme = ThemeTable.Themes.GetTheme("default");
			}
			if (currentTheme == null)
			{
				return new MvcHtmlString("<!-- Theme Not Registered -->");
			}

			var sb = new StringBuilder();
			sb.Append(Styles.Render(currentTheme.SiteStyleBundle.Path));
			return new MvcHtmlString(sb.ToString());
		}
	}
}