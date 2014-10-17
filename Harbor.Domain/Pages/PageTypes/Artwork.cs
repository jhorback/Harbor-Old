
namespace Harbor.Domain.Pages.PageTypes
{
	public class Artwork : PageType
	{
		public override string Key
		{
			get { return "artwork"; }
		}

		public override string Name
		{
			get { return "Artwork"; }
		}

		public override string Description
		{
			get { return "A page with image and text."; }
		}

		public override string ContentDescription
		{
			get { return "Contains image and text."; }
		}
		

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context
				.SetLayout(PageLayout.LayoutDisplayProperties.ContentCentered | PageLayout.LayoutDisplayProperties.NoAside)
				.SetHeader(LayoutContentTypes.Title);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context
				.AddContent(TemplateContentTypes.Image)
				.AddContent(TemplateContentTypes.Text);
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(false);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			context
				.SuggestContentType<ContentTypes.Image>()
				.SuggestContentType<ContentTypes.Text>();
		}
	}
}
