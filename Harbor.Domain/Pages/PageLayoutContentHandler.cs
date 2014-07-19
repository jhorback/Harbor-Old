
namespace Harbor.Domain.Pages
{
	public abstract class PageLayoutContentHandler
	{
		public abstract object GetLayoutContent(Page page, Uic uic, string data); // jch! should be a better way/signature
		public abstract void SetLayoutContent(Page page, Uic uic, string data);
	}
}
