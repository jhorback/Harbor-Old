using System;
using Harbor.Domain.Pages.ContentTypes;

namespace Harbor.Domain.Pages
{
	public abstract class ContentType
	{
		/// <summary>
		/// Uses the lowercase class name of the content type as the key.
		/// </summary>
		public string Key
		{
			get
			{
				return GetType().Name.ToLower();
			}
		}

		public abstract Type HandlerType { get; }
	}

	public static class TemplateContentTypes
	{
		public static TemplateContentType Text = new Text();
		public static TemplateContentType Image = new Image();
		public static TemplateContentType PageLink = new PageLink();
		public static TemplateContentType PayPalButton = new PayPalButton();
		public static TemplateContentType ProductLink = new ProductLink();
	}

	public static class LayoutContentTypes
	{
		public static ContentType Links = new Links();
		public static ContentType Title = new Title();
	}
}
