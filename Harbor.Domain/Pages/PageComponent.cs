using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public abstract class PageComponent
	{
		public abstract string Key { get; }

		protected PageComponent(Page page, string uicid)
		{
			Page = page;
			UicID = uicid;
		}

		public Page Page { get; set; }
		public string UicID { get; set; }

		public bool HasProperty(string name)
		{
			return GetProperty(name) != null;
		}

		public string GetProperty(string name)
		{
			return Page.GetUICProperty(UicID, name);
		}

		public void SetProperty(string name, string value)
		{
			Page.SetUICProperty(UicID, name, value);
		}

		public virtual IEnumerable<PageResource> DeclareResources()
		{
			yield break;
		}
	}
}
