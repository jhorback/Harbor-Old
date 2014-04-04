
namespace Harbor.Domain.Pages
{
	public class PageTypeUpdateContext
	{
		public PageTypeUpdateContext(Page page)
		{
			Page = page;
		}

		public Page Page { get; set; }
	}
}
