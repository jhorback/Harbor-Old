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
			AddHandler<PageTypeUpdateHandler>();
			AddHandler<ContentResourceUpdater>();
		}
	}



	public class PageTypeUpdateHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public PageTypeUpdateHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey);
			pageType.OnPageUpdate(page);
		}
	}




	public class PageCreatePipeline : BasePipeline<Page>
	{
		public PageCreatePipeline(IObjectFactory objectFactory) : base(objectFactory)
		{
			AddHandler<PageTypeCreateHandler>();
		}
	}




	public class PageTypeCreateHandler : IPipelineHanlder<Page>
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public PageTypeCreateHandler(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public void Execute(Page page)
		{
			var pageType = _pageTypeRepository.GetPageType(page.PageTypeKey);
			pageType.OnPageCreate(page);
		}
	}



	//public class LayoutHandler : IPipelineHanlder<Page>
	//{
	//	public void Execute(IPipelineContext<Page> context)
	//	{
	//		var page = context.Target;
	//		/*
	//		 * what part of a Template is a Layout?
	//		 * Aside
	//		 * LayoutProperties
	//		 * Title
	//		 * 
	//		 * */

	//		throw new System.NotImplementedException();
	//	}
	//}
}
