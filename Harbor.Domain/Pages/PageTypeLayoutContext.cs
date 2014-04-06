
namespace Harbor.Domain.Pages
{
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
}
