using System.Collections.Generic;


namespace Harbor.Domain.App
{
	public class FrameNavigation
	{
		public FrameNavigation()
		{
			Links = new List<FrameNavigationLink>();
		}

		public List<FrameNavigationLink> Links { get; set; }

		public IEnumerable<FrameNavigationLink> GetLinksWithSelectedPage(int pageId, int? homePageId)
		{
			foreach (var link in Links)
			{
				link.Selected = (link.PageId == pageId) || (link.PageId == 0 && pageId == homePageId);
				yield return link;
			}
		}
	}

	public class FrameNavigationLink
	{
		public string Text { get; set; }
		public string Url { get; set; }
		public int PageId { get; set; }
		public bool Selected { get; set; }
	}
}
