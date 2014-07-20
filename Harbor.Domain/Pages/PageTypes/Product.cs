
namespace Harbor.Domain.Pages.PageTypes
{
	public class Product : PageType
	{
		public override string Key
		{
			get { return "product"; }
		}

		public override string Name
		{
			get { return "Product"; }
		}

		public override string Description
		{
			get { return "A centered page with an image, text, and a PayPal button."; }
		}

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context.SetLayout(PageLayout.LayoutDisplayProperties.ContentCentered | PageLayout.LayoutDisplayProperties.NoAside)
				.SetHeader(LayoutContentTypes.Title);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context.AddContent(TemplateContentTypes.Image, new[] { Template.ContentClassNames.Col2 })
				.AddContent(TemplateContentTypes.Text, new[] { Template.ContentClassNames.Col2 })
				.AddContent(TemplateContentTypes.PayPalButton, new[] { Template.ContentClassNames.Col2 });
		}
	}
}
