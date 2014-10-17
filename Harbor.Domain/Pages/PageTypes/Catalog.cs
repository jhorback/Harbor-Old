
namespace Harbor.Domain.Pages.PageTypes
{
	public class Catalog : PageType
	{
		public override string Key
		{
			get { return "catalog"; }
		}

		public override string Name
		{
			get { return "Catalog"; }
		}

		public override string Description
		{
			get { return "A container for page listings."; }
		}

		public override string ContentDescription
		{
			get { return "Text"; }
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(true)
				.SuggestPageType<PageListing>()
				.ExcludePageType<Catalog>();
		}

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayoutStretchedWithSidebar()
				.SetHeader(LayoutContentTypes.Title)
				.SetAside(LayoutContentTypes.Links);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(TemplateContentTypes.Text, new[] { Template.ContentClassNames.Col1 })
				.SetDefaultContentClassName(Template.ContentClassNames.Col1);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			context.SuggestContentType<ContentTypes.Text>()
				.SuggestContentType<ContentTypes.Image>();
		}
	}
}
