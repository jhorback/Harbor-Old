﻿using System.Collections.Generic;
using Harbor.Domain.PageNav;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.PageComponents
{
	public class Links : PageComponent
	{
		public Links(Page page, string uicid) : base(page, uicid)
		{
			if (IsNew() == false)
			{
				_links = page.GetNavLinks(NavLinksID);
			}
		}

		private Domain.PageNav.NavLinks _links { get; set; }


		public bool IsNew()
		{
			return NavLinksID == 0;
		}

		public int NavLinksID
		{
			get
			{
				var id = GetProperty("pageID");
				return id == null ? 0 : int.Parse(id);
			}
		}

		public string UserName
		{
			get
			{
				if (_links == null) return null;
				return _links.UserName;
			}
		}

		public string Name
		{
			get
			{
				if (_links == null) return null;
				return _links.Name;
			}
		}

		public List<NavLinksSection> Sections
		{
			get
			{
				if (_links == null) return new List<NavLinksSection>();
				return _links.Sections;
			}
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			if (IsNew())
			{
				yield break;
			}
			
			yield return new LinksResource(Page, NavLinksID);

			foreach (var section in Sections)
			{
				foreach (var link in section.Links)
				{
					yield return new PageLinkResource(Page, link);
				}
			}
		}
	}
}
