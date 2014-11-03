
namespace Harbor.Domain.Pages.PageTypes
{
	public class Gallery : PageType
	{
		public override string Key
		{
			get { return "gallery"; }
		}

		public override string Name
		{
			get { return "Gallery"; }
		}

		public override string Description
		{
			get { return "A container for artwork listings."; }
		}

		public override string ContentDescription
		{
			get { return "Image and text."; }
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(true)
				.SuggestPageType<ArtworkListing>()
				.ExcludePageType<Store>()
				.ExcludePageType<Catalog>()
				.ExcludePageType<Gallery>();
		}

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayoutStretchedWithSidebar()
				.SetHeader(LayoutContentTypes.Title)
				.SetAside(LayoutContentTypes.Links);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context
				.AddContent(TemplateContentTypes.Image, new[] { Template.ContentClassNames.Col1 })
				.AddContent(TemplateContentTypes.Text, new[] { Template.ContentClassNames.Col1 })
				.SetDefaultContentClassName(Template.ContentClassNames.Col1);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			context.SuggestContentType<ContentTypes.Text>()
				.SuggestContentType<ContentTypes.Image>();
		}
	}
}
