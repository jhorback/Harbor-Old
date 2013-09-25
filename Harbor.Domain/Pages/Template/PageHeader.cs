using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public class PageHeader : PageUIC
	{
		public PageHeader() {}

		public override string type
		{
			get
			{
				return "header";
			}
		}

		public PageHeader(string key)
		{
			this.key = key;
		}
	}
}
