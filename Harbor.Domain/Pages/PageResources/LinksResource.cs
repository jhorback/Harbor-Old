
namespace Harbor.Domain.Pages.PageResources
{
	public class LinksResource : PageResource
	{
		public LinksResource(Page page, int navLinksID) : base(page)
		{
			NavLinksID = navLinksID;
		}

		public int NavLinksID { get; set; }


		public override bool Equals(object obj)
		{
			if (obj == null)
			{
				return false;
			}

			var res = obj as LinksResource;
			if (res == null)
			{
				return false;
			}

			return res.NavLinksID == NavLinksID;
		}

		public override int GetHashCode()
		{
			return NavLinksID;
		}
	}
}
