using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harbor.UI.Models.StyleGuide
{
	public class StyleGuidePageRepository
	{
		readonly List<StyleGuidePage> pages = new List<StyleGuidePage>();

		public StyleGuidePageRepository()
		{
			//registerPage("Home", "The style guide home page.");
			registerPage("Framework", "A set of supported class names.");
			registerPage("Forms", "The standard HTML form.");
			registerPage("Page", "The page layout.");
			registerPage("Collections", "The varous collection types: .colgrid, .menulist, .datalist, .datatable.");
		}

		public List<StyleGuidePage> GetPages()
		{
			return pages;
		}

		public StyleGuidePage GetPage(string key)
		{
			if (string.IsNullOrEmpty(key))
				return null;
			return pages.FirstOrDefault(p => p.Key.ToLower() == key.ToLower());
		}


		void registerPage(string name, string description)
		{
			pages.Add(new StyleGuidePage
				{
					Key = name.Replace(" ", ""),
					Name = name,
					Description = description
				});
		}
	}
}