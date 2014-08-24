using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	/// <summary>
	/// Tells the header, sidebar, and content that the page it is associated with
	/// is being deleted.
	/// </summary>
	public class ContentDeleteHandler : IPipelineHanlder<Page>
	{
		private readonly ILogger _logger;
		private readonly IContentTypeRepository _contentTypeRepository;

		public ContentDeleteHandler(ILogger logger, IContentTypeRepository contentTypeRepository)
		{
			_logger = logger;
			_contentTypeRepository = contentTypeRepository;
		}


		public void Execute(Page page)
		{
			tellHeader(page);
			tellAside(page);
			tellContent(page);
		}


		void tellHeader(Page page)
		{
			if (page.Layout.HeaderKey != null)
			{
				var headerHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.HeaderKey, page);
				if (headerHandler != null)
				{
					headerHandler.OnDelete();
				}
				else
				{
					logNoHandler(page.Layout.HeaderKey);
				}
			}
		}

		void tellAside(Page page)
		{
			if (string.IsNullOrEmpty(page.Layout.AsideKey) == false)
			{
				var asideHandler = _contentTypeRepository.GetLayoutContentHandler(page.Layout.AsideKey, page);
				if (asideHandler != null)
				{
					asideHandler.OnDelete();
				}
				else
				{
					logNoHandler(page.Layout.AsideKey);
				}
			}
		}

		void tellContent(Page page)
		{
			foreach (var item in page.Template.Content)
			{
				var contentHandler = _contentTypeRepository.GetTemplateContentHandler(item, page);
				if (contentHandler != null)
				{
					contentHandler.OnDelete();
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
