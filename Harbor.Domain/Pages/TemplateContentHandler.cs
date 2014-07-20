using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public abstract class TemplateContentHandler
	{
		protected Page Page { get; set; }
		protected TemplateUic TemplateUic { get; set; }

		protected TemplateContentHandler(Page page, TemplateUic uic)
		{
			Page = page;
			TemplateUic = uic;
		}

		protected bool HasProperty(string name)
		{
			return GetProperty(name) != null;
		}

		protected string GetProperty(string name)
		{
			return Page.GetUICProperty(TemplateUic.Id, name);
		}

		protected void SetProperty(string name, string value)
		{
			Page.SetUICProperty(TemplateUic.Id, name, value);
		}

		public abstract object GetTemplateContent();
		public abstract IEnumerable<PageResource> DeclareResources();
	}
}
