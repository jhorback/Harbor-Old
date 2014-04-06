using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class PageCreatePipeline : BasePipeline<Page>
	{
		public PageCreatePipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<PageTypeCreateHandler>();
		}
	}
}
