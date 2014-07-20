
using System.Web.Script.Serialization;

namespace Harbor.Domain.Pages
{
	public abstract class PageLayoutContentHandler
	{
		private readonly Page _page;

		protected PageLayoutContentHandler(Page page)
		{
			_page = page;
		}

		protected T GetHeader<T>()
		{
			var header = new JavaScriptSerializer().Deserialize<T>(_page.Layout.HeaderDataStr);
			return header;
		}

		protected T GetAside<T>()
		{
			var header = new JavaScriptSerializer().Deserialize<T>(_page.Layout.AsideDataStr);
			return header;
		}

		public abstract object GetLayoutContent();
		public abstract void SetLayoutContent();
	}
}
