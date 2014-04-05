using System.Collections.Generic;

namespace Harbor.Domain.Pages.Asides
{
	public class Links
	{
		public class LinksSections
		{
			public string Title { get; set; }
			public List<LinksSectionLink> Links { get; set; }
		}

		public class LinksSectionLink
		{
			public int pageID { get; set; }
			public string text { get; set; }
		}

		public List<LinksSections> Sections { get; set; }
	}
}
