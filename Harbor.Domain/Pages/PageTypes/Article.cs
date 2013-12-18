
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

		public override void DefineTemplate(PageTypeContext context)
		{
			context.SetLayout(LayoutProperties.ContentCentered | LayoutProperties.NoAside)
				.SetHeader(Components.Title.KEY)
				.AddContent(Components.Image.KEY)
				.AddContent(Components.Text.KEY);
		}
	}
}
