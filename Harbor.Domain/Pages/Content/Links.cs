using System.Collections.Generic;

namespace Harbor.Domain.Pages.Content
{
	public class Links
	{
		public class LinksSections
		{
			public string title { get; set; }
			public List<LinksSectionLink> links { get; set; }
		}

		public class LinksSectionLink
		{
			public int pageID { get; set; }
			public string text { get; set; }
		}

		public List<LinksSections> sections { get; set; }
	}
}
