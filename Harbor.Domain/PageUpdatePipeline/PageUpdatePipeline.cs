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
			AddHandler<LayoutHandler>();
			AddHandler<ResourceUpdater>();
		}
	}


	public class LayoutHandler : IPipelineHanlder<Page>
	{
		public void Execute(IPipelineContext<Page> context)
		{
			var page = context.Target;
			/*
			 * what part of a Template is a Layout?
			 * Aside
			 * LayoutProperties
			 * Title
			 * 
			 * */

			throw new System.NotImplementedException();
		}
	}
}
