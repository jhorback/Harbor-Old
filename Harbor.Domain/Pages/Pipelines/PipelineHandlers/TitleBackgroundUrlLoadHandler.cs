using Harbor.Domain.Files;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	public class TitleBackgroundUrlLoadHandler : IPipelineHanlder<Page>
	{
		private readonly IFileUrl _fileUrl;

		public TitleBackgroundUrlLoadHandler(IFileUrl fileUrl)
		{
			_fileUrl = fileUrl;
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
		}
	}
}
