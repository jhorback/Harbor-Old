using Harbor.Domain.App;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	public class RootPageUpdateHandler : IPipelineHanlder<Page>
	{
		private readonly IRootPagesRepository _rootPagesRepository;

		public RootPageUpdateHandler(IRootPagesRepository rootPagesRepository)
		{
			_rootPagesRepository = rootPagesRepository;
		}

		public void Execute(Page page)
		{
			var pageName = page.Title;
			page.IsARootPage = _rootPagesRepository.IsARootPage(pageName);
			page.RootPageUrl = _rootPagesRepository.GetRootPageUrl(pageName);
		}
	}
}
