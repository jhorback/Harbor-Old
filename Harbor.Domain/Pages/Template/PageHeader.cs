using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public class PageHeader : PageUIC
	{
		public PageHeader() {}

		public PageHeader(string type)
		{
			this.key = type;
		}
	}
}
