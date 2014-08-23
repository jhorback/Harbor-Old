
namespace Harbor.Domain.Pages.PageTypes
{
	public class Article : PageType
	{
		public override string Key
		{
			get { return "article"; }
		}

		public override string Name
		{
			get { return "Article"; }
		}

		public override string Description
		{
			get { return "A simple centered page with an image and text."; }
		}

		public override string ContentDescription
		{
			get { return "Contains image and text."; }
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
			context.AddContent(TemplateContentTypes.Image)
				.AddContent(TemplateContentTypes.Text);
		}
	}
}
