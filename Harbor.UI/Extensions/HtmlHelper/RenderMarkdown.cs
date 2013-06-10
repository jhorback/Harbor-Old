﻿using System.IO;
using System.Web;
using System.Web.Mvc;
using Harbor.UI.Models.Theming;
using Kiwi.Markdown;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
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