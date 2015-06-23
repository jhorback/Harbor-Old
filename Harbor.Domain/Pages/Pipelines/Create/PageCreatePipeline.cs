using Harbor.Domain.Pages.Pipelines.Load;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Create
{
	public class PageCreatePipeline : BasePipeline<Page>
	{
		public PageCreatePipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<PageTypeCreateHandler>();
			AddHandler<SetAllPageRolesLoadHandler>();
		}
	}
}
