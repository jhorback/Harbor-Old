
namespace Harbor.Domain.Pages.PageTypes
{
	public class ArtworkListing : PageType
	{
		public override string Key
		{
			get { return "artworklisting"; }
		}

		public override string Name
		{
			get { return "Artwork Listing"; }
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
				.SuggestPageType<Artwork>();
		}

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayoutStretchedWithoutSidebar()
				.SetHeader(LayoutContentTypes.Title);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(TemplateContentTypes.PageLink, Template.ContentClassNames.Tile)
				.SetDefaultContentClassName(Template.ContentClassNames.Tile);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			context.SuggestContentType<ContentTypes.PageLink>();
		}
	}
}
