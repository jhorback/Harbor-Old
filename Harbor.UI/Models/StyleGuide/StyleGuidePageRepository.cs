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
			registerPage("Scaffolding", "Page layout and building blocks for page structure.");
			registerPage("Typography", "Content support for font, headings, lists, etc.");
			registerPage("Forms", "Form markup and styles including alternative form layouts and buttons.");
			registerPage("Collections", "Options for displaying collections in tables, lists, and as tiles.");
			registerPage("Components", "Various visual components and controls.");
			// registerPage("Framework", "A set of supported class names.");
			// registerPage("Page", "The page layout.");
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