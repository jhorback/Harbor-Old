using Harbor.Domain.Pages;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.PageUpdatePipeline
{
	/// <summary>
	/// Calls on the page resource udpater
	/// </summary>
	public class ResourceUpdater : IPipelineHanlder<Page>
	{
		private readonly IPageResourceUpdater _pageResourceUpdater;

		public ResourceUpdater(IPageResourceUpdater pageResourceUpdater)
		{
			_pageResourceUpdater = pageResourceUpdater;
		}

		public void Execute(IPipelineContext<Page> context)
		{
			_pageResourceUpdater.UpdateResources(context.Target);
		}
	}
}
