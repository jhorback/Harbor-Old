using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace Harbor.Domain.PageNav
{
	public class NavLinksTemplate
	{
		public List<NavLinksSection> Sections { get; set; }
 
		/// <summary>
		/// Parses the template from the supplied json string.
		/// </summary>
		/// <param name="template"></param>
		/// <returns></returns>
		public static NavLinksTemplate Parse(string template)
		{
			NavLinksTemplate temp;
			if (string.IsNullOrEmpty(template))
			{
				temp = new NavLinksTemplate();
			}
			else
			{
				temp = new JavaScriptSerializer().Deserialize<NavLinksTemplate>(template);
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
