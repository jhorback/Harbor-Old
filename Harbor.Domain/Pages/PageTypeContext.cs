using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public class PageTypeContext
	{
		Template template = new Template();

		public PageTypeContext(PageType pageType)
		{
			pageType.DefineTemplate(this);
			Template.PageTypeKey = pageType.Key;
		}

		public Template Template
		{
			get
			{
				return template;
			}
		}

		public PageTypeContext SetLayout(LayoutProperties layout)
		{
			template.Layout = layout;
			return this;
		}

		public PageTypeContext SetHeader(string key)
		{
			var header = new PageHeader
			{
				key = key
			};

			template.Header = header;
			return this;
		}

		public PageTypeContext AddAside(string key)
		{
			var item = new PageAside 
			{
				key = key
			};

			template.Aside.Add(item);
			return this;
		}

		public PageTypeContext AddContent(string key)
		{
			return AddContent(key, new[] { ContentClassNames.Col1 });
		}

		public PageTypeContext AddContent(string key, string[] classNames)
		{
			var item = new PageContent
			{
				key = key,
				classNames = classNames
			};

			template.Content.Add(item);
			return this;
		}
	}
}
