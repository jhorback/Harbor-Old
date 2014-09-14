
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

		public override string ContentDescription
		{
			get { return "Tiled content"; }
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(true)
				.ExcludePageType<PageTypes.PageListing>();
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

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			throw new System.NotImplementedException();
		}
	}
}
