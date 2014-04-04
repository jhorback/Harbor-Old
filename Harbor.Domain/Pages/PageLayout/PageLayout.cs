using System.Web.Script.Serialization;

namespace Harbor.Domain.Pages
{
	public class PageLayout
	{
		public int PageLayoutID { get; set; }

		public LayoutDisplayProperties DisplayProperties { get; set; }

		public string HeaderKey { get; set; }

		public string HeaderData { get; set; }

		public string AsideKey { get; set; }

		public string AsideData { get; set; }


		public T GetHeader<T>()
		{
			var header = new JavaScriptSerializer().Deserialize<T>(HeaderData);
			return header;
		}

		public T GetAside<T>()
		{
			var aside = new JavaScriptSerializer().Deserialize<T>(AsideData);
			return aside;
		}
	}
}
