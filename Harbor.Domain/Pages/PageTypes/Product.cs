
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
				.SetHeader(Components.Title.KEY)
				.AddContent(Components.Image.KEY, new[] { Template.ContentClassNames.Col2 })
				.AddContent(Components.Text.KEY, new[] { Template.ContentClassNames.Col2 })
				.AddContent(Components.PayPalButton.KEY, new[] { Template.ContentClassNames.Col2 });
		}
	}
}
