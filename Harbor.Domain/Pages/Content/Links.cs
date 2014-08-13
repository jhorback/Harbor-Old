using System.Collections.Generic;

namespace Harbor.Domain.Pages.Content
{
	public class Links
	{
		public Links()
		{
			sections = new List<LinksSection>();
			nextId = 1;
		}

		public int nextId { get; set; }
		public List<LinksSection> sections { get; set; }

		public void EnsureIds()
		{
			foreach (var section in sections)
			{
				if (section.id == null)
				{
					section.id = nextId++;
				}
				foreach (var link in section.links)
				{
					if (link.id == null)
					{
						link.id = nextId++;
					}
				}
			}
		}
		
		public class LinksSection
		{
			public LinksSection()
			{
				links = new List<LinksSectionLink>();
			}

			public int? id { get; set; }
			public string title { get; set; }
			public List<LinksSectionLink> links { get; set; }
		}

		public class LinksSectionLink
		{
			public int? id { get; set; }
			public int pageID { get; set; }
			public string text { get; set; }
		}
	}
}
