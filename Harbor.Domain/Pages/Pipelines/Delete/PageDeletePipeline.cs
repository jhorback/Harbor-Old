using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Delete
{
	public class PageDeletePipeline : BasePipeline<Page>
	{
		public PageDeletePipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<ContentDeleteHandler>();
			// AddHandler<PageTypeDeleteHandler>(); don't need this yet
			AddHandler<DeleteLayoutDeleteHandler>();
		}
	}
}
