using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Update
{
	/// <summary>
	/// Updates the preview image and/or text if auto preview is enabled.
	/// </summary>
	public class AutoPreviewUpdateHandler  : IPipelineHanlder<Page>
	{
		private readonly IContentTypeRepository _contentTypeRepository;

		public AutoPreviewUpdateHandler(IContentTypeRepository contentTypeRepository)
		{
			_contentTypeRepository = contentTypeRepository;
		}

		public void Execute(Page page)
		{
			var foundFirstImage = !page.AutoPreviewImage; // set to true if no auto preview
			var foundFirstText = !page.AutoPreviewText;   // set to true if no auto preview

			if (page.AutoPreviewImage || page.AutoPreviewText)
			{
				foreach (var content in page.Template.Content)
				{
					if (foundFirstImage && foundFirstText)
					{
						break;
					}

					var handler = _contentTypeRepository.GetTemplateContentHandler(content, page);
					var previewImageID = handler.GetPagePreviewImageID();
					var previewText = handler.GetPagePreviewText();

					if (!foundFirstImage && page.AutoPreviewImage && previewImageID != null)
					{
						page.PreviewImageID = previewImageID;
						foundFirstImage = true;
					}

					if (!foundFirstText && page.AutoPreviewText && string.IsNullOrEmpty(previewText) == false)
					{
						page.PreviewText = previewText;
						foundFirstText = true;
					}
				}
			}
		}
	}
}
