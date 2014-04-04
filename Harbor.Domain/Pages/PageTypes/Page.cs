
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
			context.SetLayout(LayoutDisplayProperties.ContentCentered | LayoutDisplayProperties.NoAside)
				.SetHeader(Components.Title.KEY)
				.AddContent(Components.Text.KEY);
		}
	}
}