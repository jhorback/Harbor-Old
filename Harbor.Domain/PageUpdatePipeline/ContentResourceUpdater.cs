using Harbor.Domain.Pages;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.PageUpdatePipeline
{
	/// <summary>
	/// Calls on the page resource udpater
	/// </summary>
	public class ContentResourceUpdater  : IPipelineHanlder<Page>
	{
		private readonly IPageResourceUpdater _pageResourceUpdater;

		public ContentResourceUpdater(IPageResourceUpdater pageResourceUpdater)
		{
			_pageResourceUpdater = pageResourceUpdater;
		}

		public void Execute(Page page)
		{
			_pageResourceUpdater.UpdateResources(page);
		}
	}
}
