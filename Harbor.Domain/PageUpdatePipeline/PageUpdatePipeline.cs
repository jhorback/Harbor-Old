using Harbor.Domain.Pages;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.PageUpdatePipeline
{
	public class PageUpdatePipeline : BasePipeline<Page>
	{
		public PageUpdatePipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<AlternateTitleHandler>();
			AddHandler<ResourceUpdater>();
		}
	}
}
