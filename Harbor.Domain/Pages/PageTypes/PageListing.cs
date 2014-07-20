
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
				.SetHeader(LayoutContentTypes.Title)
				.SetAside(LayoutContentTypes.Links);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(TemplateContentTypes.Text, new[] { Template.ContentClassNames.Tile })
				.SetDefaultContentClassName(Template.ContentClassNames.Tile);
		}
	}
}
