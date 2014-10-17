
namespace Harbor.Domain.Pages.PageTypes
{
	public class ProductListing : PageType
	{
		public override string Key
		{
			get { return "productListing"; }
		}

		public override string Name
		{
			get { return "Product Listing"; }
		}

		public override string Description
		{
			get { return "A tiled listing of product links."; }
		}

		public override string ContentDescription
		{
			get { return "Tiled product links."; }
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(true);
		}

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayoutStretchedWithoutSidebar()
				.SetHeader(LayoutContentTypes.Title);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(TemplateContentTypes.ProductLink, Template.ContentClassNames.Tile)
				.SetDefaultContentClassName(Template.ContentClassNames.Tile);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			context.SuggestContentType<ContentTypes.ProductLink>();
		}
	}
}
