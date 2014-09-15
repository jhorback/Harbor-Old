using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class ContentTypeRepository : IContentTypeRepository
	{
		private readonly IObjectFactory _objectFactory;
		private readonly IPageTypeRepository _pageTypeRepository;
		private readonly ILogger _logger;
		
		readonly Dictionary<string, TemplateContentType> templateContentTypes = new Dictionary<string, TemplateContentType>();
		readonly Dictionary<string, ContentType> layoutContentTypes = new Dictionary<string, ContentType>();
		Dictionary<Type, TemplateContentType> contentTypesByType = new Dictionary<Type, TemplateContentType>();


		public ContentTypeRepository(IObjectFactory objectFactory, IPageTypeRepository pageTypeRepository, ILogger logger)
		{
			_objectFactory = objectFactory;
			_pageTypeRepository = pageTypeRepository;
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
			foreach (var p in type.GetFields())
			{
				var contentType = p.GetValue(null);
				if (contentType is T)
				{
					yield return (T) contentType;
				}
			}
		}

		public bool TemplateContentTypeExists(string key)
		{
			return !string.IsNullOrEmpty(key) && templateContentTypes.ContainsKey(key.ToLower());
		}


		public IDictionary<string, List<TemplateContentType>> GetContentTypesToAdd()
		{
			var contentTypes = templateContentTypes.Values;
			var dict = new Dictionary<string, List<TemplateContentType>>
			{
				{ "primary", contentTypes.ToList() },
				{ "other", new List<TemplateContentType>() }
			};
			return dict;
		}

		public IDictionary<string, List<TemplateContentType>> GetTemplateContentTypes(string parentPageTypeKey = null)
		{
			var pageType =_pageTypeRepository.GetPageType(parentPageTypeKey);
			if (pageType == null)
			{
				return GetContentTypesToAdd();
			}

			// determine all of the included page types based on the include/exclude lists
			var included = new List<TemplateContentType>();
			if (pageType.AddPageTypeFilter.IncludeTypes.Count > 0)
			{
				foreach (var include in pageType.AddPageTypeFilter.IncludeTypes)
				{
					included.Add(contentTypesByType[include]);
				}
			}
			else if (pageType.AddPageTypeFilter.ExcludeTypes.Count > 0)
			{
				included = templateContentTypes.Values.ToList();
				foreach (var exclude in pageType.AddPageTypeFilter.ExcludeTypes)
				{
					included.Remove(contentTypesByType[exclude]);
				}
			}
			else
			{
				included = templateContentTypes.Values.ToList(); ;
			}


			// determine the primary and other based on the suggested list
			Dictionary<string, List<TemplateContentType>> dict;
			if (pageType.AddPageTypeFilter.SuggestedTypes.Count > 0)
			{
				var suggested = pageType.AddPageTypeFilter.SuggestedTypes;
				dict = new Dictionary<string, List<TemplateContentType>>
				{
					{ "primary", included.Where(p => suggested.Contains(p.GetType())).ToList() },
					{ "other", included.Where(p => !suggested.Contains(p.GetType())).ToList() }
				};
			}
			else
			{
				dict = new Dictionary<string, List<TemplateContentType>>
				{
					{ "primary", included },
					{ "other", new List<TemplateContentType>() }
				};
			}

			return dict;
		}

		public TemplateContentHandler GetTemplateContentHandler(TemplateUic uic, Page page)
		{
			if (TemplateContentTypeExists(uic.Key) == false)
			{
				return null;
			}

			var contentType = templateContentTypes[uic.Key.ToLower()];
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
			var contentType = layoutContentTypes[key.ToLower()];
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
