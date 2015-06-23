using Harbor.Domain.Files;
using Harbor.Domain.Pages.Pipelines.Update;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Load
{
	public class TitleBackgroundUrlLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IFileUrl _fileUrl;
		private readonly TitlePropertiesUpdateHandler _titlePropertiesUpdate;

		public TitleBackgroundUrlLoadHandler(IFileUrl fileUrl, TitlePropertiesUpdateHandler titlePropertiesUpdate)
		{
			_fileUrl = fileUrl;
			_titlePropertiesUpdate = titlePropertiesUpdate;
		}

		public void Execute(Page page)
		{
			if (page.TitleProperties.BackgroundEnabled == true && page.PreviewImage != null)
			{
				page.TitleProperties.BackgroundUrl = _fileUrl.GetUrl(page.PreviewImage, FileResolution.High);
			}
			else
			{
				page.TitleProperties.BackgroundUrl = null;
			}

			// save the title properties
			_titlePropertiesUpdate.Execute(page);
		}
	}
}
