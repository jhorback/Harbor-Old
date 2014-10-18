
namespace Harbor.Domain.Pages.PageTypes
{
	public class PageListing : PageType
	{
		public override string Key
		{
			get { return "pageListing"; }
		}

		public override string Name
		{
			get { return "Page Listing"; }
		}

		public override string Description
		{
			get { return "A tiled listing of page links."; }
		}

		public override string ContentDescription
		{
			get { return "Tiled page links."; }
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(false)
				.SuggestPageType<PageTypes.Page>();
		}

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayoutStretchedWithoutSidebar()
				.SetHeader(LayoutContentTypes.Title);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(TemplateContentTypes.PageLink, new[] { Template.ContentClassNames.Tile })
				.SetDefaultContentClassName(Template.ContentClassNames.Tile);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			context.SuggestContentType<ContentTypes.PageLink>();
		}
	}
}
