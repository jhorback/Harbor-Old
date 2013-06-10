using System.IO;
using System.Web;
using System.Web.Mvc;
using Harbor.UI.Models.Theming;
using Kiwi.Markdown;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		/// <summary>
		/// Gets the current theme from the web config and returns the html based on the resources registered with the <see cref="ThemeTable"/>.
		/// </summary>
		/// <param name="helper"></param>
		/// <returns></returns>
		public static MvcHtmlString RenderMarkdown(this HtmlHelper helper, string path)
		{
			var absPath = VirtualPathUtility.ToAbsolute(path);
			var mappedPath = helper.ViewContext.HttpContext.Server.MapPath(absPath);
			var fileText = File.ReadAllText(mappedPath);
			var ms = new MarkdownService(null);
			var mdText = ms.ToHtml(fileText);
			return new MvcHtmlString(mdText);
		}
	}
}