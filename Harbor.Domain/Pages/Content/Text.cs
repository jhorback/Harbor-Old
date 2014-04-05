using System;
using System.Collections.Generic;
using Harbor.Domain.Files;

namespace Harbor.Domain.Pages.Content
{
	public class Text : PageContent
	{
		public Text(Page page, string uicid) : base(page, uicid)
		{
		
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			return base.DeclareResources();
		}
	}
}
