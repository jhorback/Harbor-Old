using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Script.Serialization;

namespace Harbor.Domain.Pages
{
	public class Template : IValueObject
	{
		public Template(int pageID)
		{
			Aside = new List<PageAside>();
			Content = new List<PageContent>();
			PageID = pageID;
		}

		public Template(): this(0) { }

		private int pageID;

		public int PageID
		{
			get { return pageID; }
			set { pageID = value; initUICIDs(); }
		}


		#region virtual to override
		/// <summary>
		/// The key of the page type used to create the template.
		/// </summary>
		public string PageTypeKey { get; set; }

		/// <summary>
		/// The flags that set the various layout properties.
		/// </summary>
		public LayoutProperties Layout { get; set; }

		/// <summary>
		/// The component to use as the document header.
		/// </summary>
		public PageHeader Header { get; set; }

		/// <summary>
		/// The list of components to display in the document gutter.
		/// </summary>
		public List<PageAside> Aside { get; set; }

		/// <summary>
		/// The list of components to display as the document content.
		/// </summary>
		public List<PageContent> Content { get; set; }
		#endregion

		#region base implementation

		/// <summary>
		/// For every component added to the document the component counter is incremented.
		/// This is used to keep uicid's unique.
		/// </summary>
		public int ComponentCounter { get; set; }

		/// <summary>
		/// Parses the template as a json string into an instance of the TemplateBase.
		/// </summary>
		/// <param name="template"></param>
		/// <param name="pageID"> </param>
		/// <returns></returns>
		public static Template Parse(string template, int pageID)
		{
			Template temp;
			if (string.IsNullOrEmpty(template))
			{
				temp = new Template(pageID);
			}
			else
			{
				temp = new JavaScriptSerializer().Deserialize<Template>(template);
				temp.PageID = pageID;
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
		#endregion

		const string idFormat = "pc-{0}-{1}";

		/// <summary>
		/// Initializes the template instance by assigning UICID's to each component.
		/// </summary>
		private void initUICIDs()
		{
			if (PageID == 0 || ComponentCounter != 0)
				return;

			ComponentCounter++; // start with 1

			if (Header != null)
				Header.uicid = string.Format(idFormat, PageID, ComponentCounter++);

			foreach (var item in Aside)
				item.uicid = string.Format(idFormat, PageID, ComponentCounter++);

			foreach (var item in Content)
				item.uicid = string.Format(idFormat, PageID, ComponentCounter++);
		}
	}
}

