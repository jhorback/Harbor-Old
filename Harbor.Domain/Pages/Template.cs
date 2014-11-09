using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace Harbor.Domain.Pages
{
	public class Template : IValueObject
	{
		public Template(int pageID)
		{
			Content = new List<TemplateUic>();
			PageID = pageID;
			DefaultContentClassName = ContentClassNames.Col1;
		}

		public Template(): this(0) { }

		private int pageID;

		public int PageID
		{
			get { return pageID; }
			set { pageID = value; initUICIDs(); }
		}

		/// <summary>
		/// The list of components to display as the document content.
		/// </summary>
		public List<TemplateUic> Content { get; set; }

		/// <summary>
		/// The class name to be used for new content.
		/// </summary>
		public string DefaultContentClassName { get; set; }

		/// <summary>
		/// If true, a call to AddContent will prepend rather than append
		/// the content.
		/// </summary>
		public bool PrependContentByDefault { get; set; }
		#region ContentClassNames
		public class ContentClassNames
		{
			public const string Col1 = "col1";
			public const string Col2 = "col2";
			public const string Col3 = "col3";
			public const string Col3_2 = "col3-2";
			public const string Clear = "clear";
			public const string Tile = "col5";

			public const string Text_Left = "text-left";
			public const string Text_Center = "text-center";
			public const string Text_Right = "text-right";
			public const string Text_Justify = "text-justify";
		}
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

		const string idFormat = "pc-{0}-{1}";

		/// <summary>
		/// Initializes the template instance by assigning UICID's to each component.
		/// </summary>
		private void initUICIDs()
		{
			if (PageID == 0 || ComponentCounter != 0)
				return;

			ComponentCounter++; // start with 1

			foreach (var item in Content)
				item.Id = getNextUICID();
		}

		private string getNextUICID()
		{
			ComponentCounter = ComponentCounter + 1;
			return string.Format(idFormat, PageID, ComponentCounter);
		}
		#endregion

		public void AddContent(string key)
		{
			var content = new TemplateUic
				{
					ClassNames = DefaultContentClassName.Split(' '),
					Id = getNextUICID(),
					Key = key
				};

			if (PrependContentByDefault)
			{
				Content.Insert(0, content);
			}
			else
			{
				Content.Add(content);
			}
		}


		public readonly IDictionary<string, object> contentData = new Dictionary<string, object>();

		public void SetContentData<T>(string uicid, T data)
		{
			if (contentData.ContainsKey(uicid))
			{
				contentData[uicid] = data;
			}
			else
			{
				contentData.Add(uicid, data);				
			}
		}

		public T GetContentData<T>(string uicid)
		{
			if (contentData.ContainsKey(uicid))
			{
				return (T)contentData[uicid];
			}
			return default(T);
		}
	}
}

