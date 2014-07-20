using System;
using System.Collections.Generic;
using Harbor.Domain.Files;

namespace Harbor.Domain.Pages.Content
{
	public class Text
	{
		public Text(string html)
		{
			Html = html;
		}

		public string Html { get; private set; }
	}
}
