using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public abstract class PageUIC
	{
		public string id
		{
			get
			{
				return uicid;
			}
		}

		/// <summary>
		/// The key/type of the Document Component.
		/// </summary>
		public string key { get; set; }

		/// <summary>
		/// The component type (e.g. header, aside, or content).
		/// </summary>
		public abstract string type { get; }

		/// <summary>
		/// The ID of the component in the template.
		/// </summary>
		public string uicid { get; set; }
	}
}
