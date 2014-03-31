using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	[Obsolete("Aside is now part of the page layout.")]
	public class PageAside : PageUIC
	{
		public PageAside() { }

		public PageAside(string type)
		{
			key = type;
		}

		public override string type
		{
			get { return "aside"; }
		}
	}
}
