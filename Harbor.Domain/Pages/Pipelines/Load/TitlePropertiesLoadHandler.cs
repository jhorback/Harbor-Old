using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Load
{
	public class TitilePropertiesLoadHandler : IPipelineHanlder<Page>
	{
		public void Execute(Page page)
		{
			var props = page.GetProperty("TitleProperties");
			page.TitleProperties = JSON.Parse<PageTitleProperties>(props) ?? new PageTitleProperties();
		}
	}
}
