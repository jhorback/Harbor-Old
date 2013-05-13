using System;
using System.Linq;
using Harbor.Domain.Files;

namespace Harbor.Domain.Pages.PageResources
{
	public class PageLinkResource : PageResource
	{
		public PageLinkResource(Page page, int pageID) : base(page)
		{
			PageID = pageID;
		}


		public int PageID { get; set; }


		public override bool Equals(object obj)
		{
			if (obj == null)
			{
				return false;
			}

			var res = obj as PageLinkResource;
			if (res == null)
			{
				return false;
			}

			return res.PageID == PageID;
		}

		public override int GetHashCode()
		{
			return PageID; 
		}
	}
}
