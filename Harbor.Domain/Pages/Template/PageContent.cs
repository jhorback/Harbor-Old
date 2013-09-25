using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public class PageContent : PageUIC
	{
		private string[] _classNames;

		public string[] classNames
		{
			get
			{
				if (_classNames == null || _classNames.Length == 0)
					return new[] { Harbor.Domain.Pages.ContentClassNames.Col1 };
				return _classNames;
			}
			set { _classNames = value; }
		}

		public override string type
		{
			get { return "content"; }
		}
	}
}
