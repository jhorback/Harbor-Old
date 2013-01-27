using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public abstract class PageUIC
	{
		/// <summary>
		/// The key/type of the Document Component.
		/// </summary>
		public string key { get; set; }

		/// <summary>
		/// The ID of the component in the template.
		/// </summary>
		public string uicid { get; set; }
	}
}
