using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Harbor.Domain.PageNav;

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

		private NavLinks _links { get; set; }


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

		public NavLinksTemplate Template
		{
			get
			{
				if (_links == null) return null;
				return _links.Template;
			}
		}
	}
}
