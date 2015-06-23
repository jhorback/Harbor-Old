using Harbor.Domain.Pages.Pipelines.Update;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Load
{
	/// <summary>
	/// Executed when a single page is loaded.
	/// </summary>
	public class PageLoadPipeline : BasePipeline<Page>
	{
		public PageLoadPipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<SetAllPageRolesLoadHandler>();
			AddHandler<EnsurePageLayoutLoadHandler>();
			AddHandler<PageTypeLoadHandler>();
			AddHandler<TitilePropertiesLoadHandler>();
			AddHandler<ContentLoadHandler>();
			AddHandler<RootPageLoadHandler>();
			AddHandler<TitleBackgroundUrlLoadHandler>();
		}
	}

	public class TitilePropertiesLoadHandler : IPipelineHanlder<Page>
	{
		public void Execute(Page page)
		{
			var props = page.GetProperty("TitleProperties");
			page.TitleProperties = JSON.Parse<PageTitleProperties>(props) ?? new PageTitleProperties();
		}
	}
}
