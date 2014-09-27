using Harbor.Domain.Pages.PipelineHandlers;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class PageUpdatePipeline : BasePipeline<Page>
	{
		public PageUpdatePipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<PageTypeUpdateHandler>();
			AddHandler<ContentLoadHandler>(); // run this before the resource updater
			AddHandler<AutoPreviewUpdateHandler>();
			AddHandler<ContentResourceUpdateHandler>();
		}
	}
}
