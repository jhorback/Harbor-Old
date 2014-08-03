using System.Collections.Generic;

namespace Harbor.Domain.Pages.Content
{
	public class Links
	{
		public Links()
		{
			sections = new List<LinksSection>();
		}

		public List<LinksSection> sections { get; set; }

		
		public class LinksSection
		{
			public LinksSection()
			{
				links = new List<LinksSectionLink>();
			}

			public string title { get; set; }
			public List<LinksSectionLink> links { get; set; }
		}

		public class LinksSectionLink
		{
			public int pageID { get; set; }
			public string text { get; set; }
		}
	}
}
