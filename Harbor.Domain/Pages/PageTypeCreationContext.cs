
namespace Harbor.Domain.Pages
{
	public class PageTypeLoadContext : PageTypeCreationContext
	{
		public PageTypeLoadContext(Page page) : base(page)
		{
			
		}

		public override PageTypeCreationContext AddContent(string type)
		{
			return this;
		}

		public override PageTypeCreationContext AddContent(string type, string[] classNames)
		{
			return this;
		}
	}

	public class PageTypeCreationContext
	{
		public PageTypeCreationContext(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }


		public PageTypeCreationContext SetLayout(PageLayout.LayoutDisplayProperties layout)
		{
			Page.Layout.DisplayProperties = layout;
			return this;
		}

		public PageTypeCreationContext SetHeader(string type)
		{
			Page.Layout.HeaderKey = type;
			return this;
		}

		public PageTypeCreationContext SetAside(string type)
		{
			Page.Layout.AsideKey = type;
			return this;
		}

		public virtual PageTypeCreationContext AddContent(string type)
		{
			return AddContent(type, new[] { Page.Template.DefaultContentClassName });
		}

		public virtual PageTypeCreationContext AddContent(string type, string[] classNames)
		{
			var item = new Template.Uic
			{
				key = type,
				classNames = classNames
			};

			Page.Template.Content.Add(item);
			return this;
		}

		public PageTypeCreationContext SetDefaultContentClassName(string className)
		{
			Page.Template.DefaultContentClassName = className;
			return this;
		}

	}
}
