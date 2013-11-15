using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using Harbor.Domain.Diagnostics;

namespace Harbor.Domain.PageNav
{
	public class NavLinksTemplate
	{
		public NavLinksTemplate()
		{
			Sections = new List<NavLinksSection>();
		}

		public List<NavLinksSection> Sections { get; set; }
 
		/// <summary>
		/// Parses the template from the supplied json string.
		/// </summary>
		/// <param name="template"></param>
		/// <returns></returns>
		public static NavLinksTemplate Parse(string template)
		{
			NavLinksTemplate temp = new NavLinksTemplate();
			if (string.IsNullOrEmpty(template) == false)
			{
				try
				{
					temp = new JavaScriptSerializer().Deserialize<NavLinksTemplate>(template);
				}
				catch (InvalidOperationException e)
				{
					var logger = new Logger(typeof(NavLinksTemplate));
					logger.Error(e);
				}
			}
			return temp;
		}

		/// <summary>
		/// Returns the template as a json string for serialization.
		/// </summary>
		/// <returns></returns>
		public override string ToString()
		{
			return new JavaScriptSerializer().Serialize(this);
		}
	}
}
