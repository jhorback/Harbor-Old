using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
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
			AddHandler<SetPageTypeLoadHandler>();
		}
	}
}
