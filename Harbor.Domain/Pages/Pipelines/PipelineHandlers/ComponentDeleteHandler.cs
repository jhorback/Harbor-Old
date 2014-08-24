using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	public class ComponentDeleteHandler : IPipelineHanlder<Page>
	{

		public void Execute(Page context)
		{
			// jch! - need to implement
			// load the component repository (or whatever) - need OnDelete method
			// would looop through the template content
			// call OnDelete for each component
		}
	}
}
