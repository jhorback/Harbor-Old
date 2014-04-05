
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
			get { return "A page with navigation links and tiled content."; }
		}

		public override void OnPageCreate(PageTypeCreationContext context)
		{
			context.SetLayout(PageLayout.LayoutDisplayProperties.None)
				.SetHeader(ContentTypes.Title.KEY)
				// jch!! - .SetAside(ContentTypes.Links.KEY)
				.AddContent(ContentTypes.Text.KEY, new [] {Template.ContentClassNames.Tile})
				.SetDefaultContentClassName(Template.ContentClassNames.Tile);
		}
	}
}
