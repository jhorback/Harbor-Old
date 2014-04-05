
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

		public override void OnPageCreate(PageTypeCreationContext context)
		{
			context.SetLayout(PageLayout.LayoutDisplayProperties.ContentCentered | PageLayout.LayoutDisplayProperties.NoAside)
				.SetHeader(ContentTypes.Title.KEY)
				.AddContent(ContentTypes.Image.KEY, new[] { Template.ContentClassNames.Col2 })
				.AddContent(ContentTypes.Text.KEY, new[] { Template.ContentClassNames.Col2 })
				.AddContent(ContentTypes.PayPalButton.KEY, new[] { Template.ContentClassNames.Col2 });
		}
	}
}
