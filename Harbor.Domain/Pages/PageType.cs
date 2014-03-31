using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Harbor.Domain.PageUpdatePipeline;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Used to help define a page Template.
	/// </summary>
	public abstract class PageType
	{
		public PageType()
		{
			Template = new Template();
			Context = new PageTypeContext(this);
		}

		public abstract string Key { get; }

		public abstract string Name { get; }

		public virtual string Description { get { return ""; } }

		public PageTypeContext Context { get; private set; }

		public virtual void OnPageUpdate(Page page)
		{
			
		}

		public virtual void OnPageCreate(Page page)
		{

		}


		[Obsolete("Use the OnPageCreate method.")]
		public abstract void DefineTemplate(PageTypeContext context);

		[Obsolete("Will set the properties on the page directly.")]
		public Template Template { get; set; }
	}
}
