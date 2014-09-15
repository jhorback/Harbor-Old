
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
