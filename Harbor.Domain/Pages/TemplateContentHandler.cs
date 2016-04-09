using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.Content;

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

		protected string UICPropertyName(string name)
		{
			return Page.UICPropertyName(TemplateUic.Id, name);
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

		protected T GetContent<T>()
		{
			return Page.Template.GetContentData<T>(TemplateUic.Id);
		}

		public abstract object GetTemplateContent();
		public abstract IEnumerable<PageResource> DeclareResources();
		public abstract IEnumerable<string> DeclarePropertyNames();

		public virtual string GetPagePreviewText()
		{
			return null;
		}

		public virtual Guid? GetPagePreviewImageID()
		{
			return null;
		}



		/// <summary>
		/// When implemented allows template content to perform operations when the page is being deleted.
		/// </summary>
		public virtual void OnDelete()
		{
			// noop
		}
	}
}
