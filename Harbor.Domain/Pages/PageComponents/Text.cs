﻿using System;
using System.Collections.Generic;
using Harbor.Domain.Files;

namespace Harbor.Domain.Pages.PageComponents
{
	public class Text : PageComponent
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