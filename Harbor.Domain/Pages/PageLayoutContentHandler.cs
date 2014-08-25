
using System.Web.Script.Serialization;

namespace Harbor.Domain.Pages
{
	public abstract class PageLayoutContentHandler
	{
		public Page Page { get; private set; }

		protected PageLayoutContentHandler(Page page)
		{
			Page = page;
		}

		protected T GetHeader<T>()
		{
			var header = deserialize<T>(Page.Layout.HeaderDataStr);
			return header;
		}

		protected T GetAside<T>()
		{
			var aside = deserialize<T>(Page.Layout.AsideDataStr);
			return aside;
		}

		T deserialize<T>(string str)
		{
			if (string.IsNullOrEmpty(str))
			{
				return default(T);
			}
			return JSON.Parse<T>(str);
		}

		public abstract object GetLayoutContent();

		/// <summary>
		/// Allows layout to perform operations before the page is deleted.
		/// </summary>
		public virtual void OnDelete()
		{
			// noop
		}
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
