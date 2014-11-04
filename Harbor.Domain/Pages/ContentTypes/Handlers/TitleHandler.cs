
namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class TitleHandler : PageLayoutContentHandler
	{
		public TitleHandler(Page page)
			: base(page)
		{
		}

		public override object GetLayoutContent()
		{
			var title = Page.Layout.Title;
			if (string.IsNullOrEmpty(title))
			{
				title = Page.Title;
			}
			return new Content.Title(title);
		}
	}
}
