using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Update
{
	public class TitlePropertiesUpdateHandler : IPipelineHanlder<Page>
	{
		public void Execute(Page page)
		{
			var props = JSON.Stringify(page.TitleProperties);
			page.SetProperty("TitleProperties", props);
		}
	}
}
