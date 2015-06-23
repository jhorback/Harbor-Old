using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Update
{
	/// <summary>
	/// Calls on the page resource udpater
	/// </summary>
	public class ContentResourceUpdateHandler  : IPipelineHanlder<Page>
	{
		private readonly IPageResourceUpdater _pageResourceUpdater;

		public ContentResourceUpdateHandler(IPageResourceUpdater pageResourceUpdater)
		{
			_pageResourceUpdater = pageResourceUpdater;
		}

		public void Execute(Page page)
		{
			_pageResourceUpdater.UpdateResources(page);
		}
	}
}
