
namespace Harbor.Domain.Pages
{
	//jch! - move / rename these classes
	public class PageTypeLayoutContext
	{
		public PageTypeLayoutContext(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }

		public PageTypeLayoutContext SetLayout(PageLayout.LayoutDisplayProperties layout)
		{
			Page.Layout.DisplayProperties = layout;
			return this;
		}

		public PageTypeLayoutContext SetHeader(string type)
		{
			Page.Layout.HeaderKey = type;
			return this;
		}

		public PageTypeLayoutContext SetAside(string type)
		{
			Page.Layout.AsideKey = type;
			return this;
		}
	}

	public class PageTypeTemplateContext
	{
		public PageTypeTemplateContext(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }


		public virtual PageTypeTemplateContext AddContent(string type)
		{
			return AddContent(type, new[] { Page.Template.DefaultContentClassName });
		}

		public virtual PageTypeTemplateContext AddContent(string type, string[] classNames)
		{
			var item = new Template.Uic
			{
				key = type,
				classNames = classNames
			};

			Page.Template.Content.Add(item);
			return this;
		}

		public PageTypeTemplateContext SetDefaultContentClassName(string className)
		{
			Page.Template.DefaultContentClassName = className;
			return this;
		}
	}
}
