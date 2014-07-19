using System;
using System.Collections;
using System.Collections.Generic;
using System.Web.Handlers;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Defines a component that can be added as content of a document. // jch!  rename file
	/// </summary>
	public abstract class TemplateContentType : ContentType
	{
		public abstract string Name { get; }
		public abstract string Description { get; }
		[Obsolete("Using the HandlerType and DataType to provide this via a load handler.")]
		public abstract Type PageComponent { get; }
	}




	public abstract class ContentType
	{
		/// <summary>
		/// Uses the lowercase class name of the content type as the key.
		/// </summary>
		public string Key
		{
			get
			{
				return this.GetType().Name.ToLower();
			}
		}
		public abstract Type HandlerType { get; }
		public abstract Type DataType { get; }
	}

	public abstract class LayoutContentHandler
	{
		public abstract object GetLayoutContent(Page page, Uic uic);
		public abstract void SetLayoutContent(Page page, Uic uic);
	}

	public abstract class TemplateContentHandler
	{
		public abstract object GetTemplateContent(Page page, TemplateUic uic);
		public abstract void SetTemplateContent(Page page, TemplateUic uic);
	}

	public class Uic
	{
		public string Key { get; set; }
		public string Id { get; set; }
	}

	public class TemplateUic : Uic
	{
		public string[] ClassNames { get; set; }
	}











	public interface IContentTypeRepository
	{
		IEnumerable<ContentType> GetContentTypes();	
		TemplateContentHandler GetTemplateContentHandler(string key);
		LayoutContentHandler GetLayoutContentHandler(string key);
	}

	//public class ContentTypeRepository : IContentTypeRepository
	//{

		
	//}
}
