
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
			get { return "A generic empty page."; }
		}

		public override void DefineTemplate(PageTypeContext context)
		{
			context.SetLayout(LayoutProperties.ContentCentered | LayoutProperties.NoAside)
				.SetHeader(Components.Title.KEY)
				.AddContent(Components.Text.KEY);
		}
	}
}
