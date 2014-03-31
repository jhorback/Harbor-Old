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

		public PageTypeContext SetLayout(LayoutDisplayProperties layout)
		{
			template.Layout = layout;
			return this;
		}

		public PageTypeContext SetHeader(string type)
		{
			var header = new PageHeader(type);

			template.Header = header;
			return this;
		}

		public PageTypeContext AddAside(string type)
		{
			var item = new PageAside(type);

			template.Aside.Add(item);
			return this;
		}

		public PageTypeContext AddContent(string type)
		{
			return AddContent(type, new[] { template.DefaultContentClassName });
		}

		public PageTypeContext AddContent(string type, string[] classNames)
		{
			var item = new PageContent
			{
				key = type,
				classNames = classNames
			};

			template.Content.Add(item);
			return this;
		}

		public PageTypeContext SetDefaultContentClassName(string className)
		{
			template.DefaultContentClassName = className;
			return this;
		}
	}
}
