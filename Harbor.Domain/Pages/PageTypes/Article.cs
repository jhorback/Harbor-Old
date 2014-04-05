
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

		public override void OnPageCreate(PageTypeCreationContext context)
		{
			context.SetLayout(PageLayout.LayoutDisplayProperties.ContentCentered | PageLayout.LayoutDisplayProperties.NoAside)
				.SetHeader(ContentTypes.Title.KEY)
				.AddContent(ContentTypes.Image.KEY)
				.AddContent(ContentTypes.Text.KEY);
		}
	}
}
