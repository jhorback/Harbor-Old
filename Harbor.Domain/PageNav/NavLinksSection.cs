using System.Collections.Generic;

namespace Harbor.Domain.PageNav
{
	public class NavLinksSection
	{
		public string Title { get; set; }
		public List<NavLinksSectionLink> Links { get; set; }
	}
}
