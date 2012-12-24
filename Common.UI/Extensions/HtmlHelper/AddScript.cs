using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace Common.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		public static HtmlString AddScript(this HtmlHelper helper, string path)
		{
			var scriptStr = "";
			path = VirtualPathUtility.ToAbsolute(path);

			var addedScrpits = helper.ViewContext.HttpContext.Items["JsScriptsAdded"] as List<string>;
			if (addedScrpits == null)
			{
				addedScrpits = new List<string>();
			}

			if (addedScrpits.Contains(path) == false)
			{
				addedScrpits.Add(path);
				scriptStr = "<script src=\"" + path + "\"></script>\n";
			}
			
			helper.ViewContext.HttpContext.Items["JsScriptsAdded"] = addedScrpits;
			return new HtmlString(scriptStr);
		}
	}
}