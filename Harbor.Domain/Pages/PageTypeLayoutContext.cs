
namespace Harbor.Domain.Pages
{
	public class PageTypeLayoutContext
	{
		public PageTypeLayoutContext(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }

		public PageTypeLayoutContext SetLayoutStretchedWithSidebar()
		{
			Page.Layout.DisplayProperties = PageLayout.LayoutDisplayProperties.None;
			return this;
		}
		
		public PageTypeLayoutContext SetLayoutCenteredWithSidebar()
		{
			Page.Layout.DisplayProperties = PageLayout.LayoutDisplayProperties.ContentCentered;
			return this;
		}

		public PageTypeLayoutContext SetLayoutStretchedWithoutSidebar()
		{
			Page.Layout.DisplayProperties = PageLayout.LayoutDisplayProperties.NoAside;
			return this;
		}

		public PageTypeLayoutContext SetLayoutCenteredWithoutSidebar()
		{
			Page.Layout.DisplayProperties = PageLayout.LayoutDisplayProperties.ContentCentered |
				PageLayout.LayoutDisplayProperties.NoAside;
			return this;
		}

		public PageTypeLayoutContext SetLayout(PageLayout.LayoutDisplayProperties layout)
		{
			Page.Layout.DisplayProperties = layout;
			return this;
		}

		public PageTypeLayoutContext SetHeader(ContentType headerType)
		{
			Page.Layout.HeaderKey = headerType.Key;
			return this;
		}

		public PageTypeLayoutContext SetAside(ContentType asideType)
		{
			Page.Layout.AsideKey = asideType.Key;
			return this;
		}

		public PageTypeLayoutContext PrependTemplateContent(bool prepend = true)
		{
			Page.Template.PrependContentByDefault = prepend;
			return this;
		}
	}
}
