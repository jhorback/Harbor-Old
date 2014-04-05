using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// A base class for all content mapped via the page template content.
	/// </summary>
	public abstract class PageContent
	{
		protected PageContent(Page page, string uicid)
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
