using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Load
{
	public class ContentLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IContentTypeRepository _contentTypeRepository;
		private readonly ILogger _logger;

		public ContentLoadHandler(IContentTypeRepository contentTypeRepository, ILogger logger)
		{
			_contentTypeRepository = contentTypeRepository;
			_logger = logger;
		}

		public void Execute(Page page)
		{
			setHeader(page);
			setAside(page);
			setContent(page);
		}


		void setHeader(Page page)
		{
			if (page.Layout.HeaderKey != null)
			{
				var headerHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.HeaderKey, page);
				if (headerHandler != null)
				{
					var headerData = headerHandler.GetLayoutContent();
					page.Layout.SetHeaderData(headerData);
				}
				else
				{
					logNoHandler(page.Layout.HeaderKey);
				}
			}
		}

		void setAside(Page page)
		{
			if (string.IsNullOrEmpty(page.Layout.AsideKey) == false)
			{
				var asideHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.AsideKey, page);
				if (asideHandler != null)
				{
					var asideData = asideHandler.GetLayoutContent();
					page.Layout.SetAsideData(asideData);
				}
				else
				{
					logNoHandler(page.Layout.AsideKey);
				}
			}
		}

		void setContent(Page page)
		{
			foreach (var item in page.Template.Content)
			{
				var contentHandler = _contentTypeRepository.GetTemplateContentHandler(item, page);
				if (contentHandler != null)
				{
					var contentData = contentHandler.GetTemplateContent();
					page.Template.SetContentData(item.Id, contentData);
				}
				else
				{
					logNoHandler(item.Key);
				}
			}
		}

		void logNoHandler(string handlerKey)
		{
			var error = string.Format("The handler was null. Handler key: {0}", handlerKey);
			_logger.Error(error);
		}
	}
}
