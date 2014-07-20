using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class ContentTypeRepository : IContentTypeRepository
	{
		private readonly IObjectFactory _objectFactory;
		readonly Dictionary<string, TemplateContentType> templateContentTypes = new Dictionary<string, TemplateContentType>();
		readonly Dictionary<string, ContentType> layoutContentTypes = new Dictionary<string, ContentType>(); 

		public ContentTypeRepository(IObjectFactory objectFactory)
		{
			_objectFactory = objectFactory;
			foreach (var type in getStaticFields<TemplateContentType>(typeof(TemplateContentTypes)))
			{
				templateContentTypes.Add(type.Key, type);
			}

			foreach (var type in getStaticFields<ContentType>(typeof(LayoutContentTypes)))
			{
				layoutContentTypes.Add(type.Key, type);
			}
		}

		IEnumerable<T> getStaticFields<T>(Type type)
		{
			foreach (var p in type.GetFields(System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic))
			{
				var contentType = p.GetValue(null);
				if (contentType is T)
				{
					yield return (T) contentType;
				}
			}
		}


		public IEnumerable<ContentType> GetTemplateContentTypes()
		{
			return templateContentTypes.Values;
		}

		public TemplateContentHandler GetTemplateContentHandler(string key, Page page)
		{
			var contentType = templateContentTypes[key];
			if (contentType == null)
			{
				return null;
			}

			try
			{
				var handler = _objectFactory.GetInstance(contentType.HandlerType, new
				{

				});
			}
			catch (Exception e)
			{
				
			}

			// TemplateContentHandler
			// contentType.HandlerType
			
		}

		public PageLayoutContentHandler GetLayoutContentHandler(string key, Page page)
		{
			throw new NotImplementedException();
		}
	}
}
