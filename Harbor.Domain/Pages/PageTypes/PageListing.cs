
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

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayout(PageLayout.LayoutDisplayProperties.None)
				.SetHeader(ContentTypes.Title.KEY)
				.SetAside(ContentTypes.Links.KEY);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(ContentTypes.Text.KEY, new[] { Template.ContentClassNames.Tile })
				.SetDefaultContentClassName(Template.ContentClassNames.Tile);
		}
	}
}
