
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
			context.SetLayout(LayoutDisplayProperties.ContentCentered | LayoutDisplayProperties.NoAside)
				.SetHeader(Components.Title.KEY)
				.AddContent(Components.Image.KEY)
				.AddContent(Components.Text.KEY);
		}

		public override void OnPageCreate(Pages.Page page)
		{
			// jch! need
			page.Layout.DisplayProperties = LayoutDisplayProperties.ContentCentered | LayoutDisplayProperties.NoAside;
			page.Layout.h

			Context.SetLayout(LayoutDisplayProperties.ContentCentered | LayoutDisplayProperties.NoAside)
				.SetHeader(Components.Title.KEY)
				.AddContent(Components.Image.KEY)
				.AddContent(Components.Text.KEY);


		}
	}
}
