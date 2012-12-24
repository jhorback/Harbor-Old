using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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
		}

		public Template Template { get; set; }

		public abstract string Key { get; }

		public abstract string Name { get; }

		public virtual string Description { get { return ""; } }

		public abstract void DefineTemplate(PageTypeContext context);
	}
}
