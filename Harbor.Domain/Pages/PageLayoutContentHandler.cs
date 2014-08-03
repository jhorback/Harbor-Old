
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
			var header = deserialize<T>(_page.Layout.HeaderDataStr);
			return header;
		}

		protected T GetAside<T>()
		{
			var aside = deserialize<T>(_page.Layout.AsideDataStr);
			return aside;
		}

		T deserialize<T>(string str)
		{
			if (string.IsNullOrEmpty(str))
			{
				return default(T);
			}

			return new JavaScriptSerializer().Deserialize<T>(str);
		}

		public abstract object GetLayoutContent();
	}


	public class HeaderHandler<T> : PageLayoutContentHandler
	{
		public HeaderHandler(Page page)
			: base(page)
		{
		}

		public override object GetLayoutContent()
		{
			return GetHeader<T>();
		}
	}


	public class AsideHandler<T> : PageLayoutContentHandler
	{
		public AsideHandler(Page page)
			: base(page)
		{
		}

		public override object GetLayoutContent()
		{
			return GetAside<T>();
		}
	}
}
