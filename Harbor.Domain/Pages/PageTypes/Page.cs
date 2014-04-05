
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

		public override void OnPageCreate(PageTypeCreationContext context)
		{
			context.SetLayout(PageLayout.LayoutDisplayProperties.ContentCentered | PageLayout.LayoutDisplayProperties.NoAside)
				.SetHeader(ContentTypes.Title.KEY)
				.AddContent(ContentTypes.Text.KEY);
		}
	}
}