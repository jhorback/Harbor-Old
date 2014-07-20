using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class ContentTypeRepository : IContentTypeRepository
	{
		private readonly IObjectFactory _objectFactory;
		private readonly ILogger _logger;
		readonly Dictionary<string, TemplateContentType> templateContentTypes = new Dictionary<string, TemplateContentType>();
		readonly Dictionary<string, ContentType> layoutContentTypes = new Dictionary<string, ContentType>(); 


		public ContentTypeRepository(IObjectFactory objectFactory, ILogger logger)
		{
			_objectFactory = objectFactory;
			_logger = logger;
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


		public IEnumerable<TemplateContentType> GetTemplateContentTypes()
		{
			return templateContentTypes.Values;
		}

		public TemplateContentHandler GetTemplateContentHandler(TemplateUic uic, Page page)
		{
			var contentType = templateContentTypes[uic.Key];
			if (contentType == null)
			{
				return null;
			}

			TemplateContentHandler handler = null;
			try
			{
				handler = _objectFactory.GetInstance(contentType.HandlerType, new
				{
					page = page,
					uic = uic
				}) as TemplateContentHandler;
			}
			catch (Exception e)
			{
				var error = string.Format("Could not create content handler. Key: {0}, id: {1}", uic.Key, uic.Id);
				_logger.Error(error, e);
			}

			return handler;
		}

		public PageLayoutContentHandler GetLayoutContentHandler(string key, Page page)
		{
			var contentType = layoutContentTypes[key];
			if (contentType == null)
			{
				return null;
			}

			PageLayoutContentHandler handler = null;
			try
			{
				handler = _objectFactory.GetInstance(contentType.HandlerType, new
				{
					page = page
				}) as PageLayoutContentHandler;
			}
			catch (Exception e)
			{
				var error = string.Format("Could not create layout content handler. Key: {0}.", key);
				_logger.Error(error, e);
			}

			return handler;
		}
	}
}
