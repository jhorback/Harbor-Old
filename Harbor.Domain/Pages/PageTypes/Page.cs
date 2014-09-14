
namespace Harbor.Domain.Pages.PageTypes
{
	public class Page : PageType
	{
		public override string Key
		{
			get { return "page"; }
		}

		public override string Name
		{
			get { return "Page"; }
		}

		public override string Description
		{
			get { return "A simple centered page with text."; }
		}

		public override string ContentDescription
		{
			get { return "Contains text."; }
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(false);
		}

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayout(PageLayout.LayoutDisplayProperties.ContentCentered | PageLayout.LayoutDisplayProperties.NoAside)
				.SetHeader(LayoutContentTypes.Title);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(TemplateContentTypes.Text);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
		}
	}
}