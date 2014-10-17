using Harbor.Domain.Command;
using Harbor.Domain.Pages.ContentTypes;
using Harbor.Domain.Pages.ContentTypes.Handlers;
using Harbor.Domain.Pages.PipelineHandlers;

namespace Harbor.Domain.Pages.Commands
{
	public class ResetPageLayout : PageCommand
	{
	}

	public class ResetPageLayoutHandler : ICommandHandler<ResetPageLayout>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IObjectFactory _objectFactory;

		public ResetPageLayoutHandler(IPageRepository pageRepository, IObjectFactory objectFactory)
		{
			_pageRepository = pageRepository;
			_objectFactory = objectFactory;
		}

		public void Handle(ResetPageLayout command)
		{
			var page = _pageRepository.FindById(command.PageID);

			// remove the link from the layout
			var linksHandler = _objectFactory.GetInstance<LinksHandler>(new { page = page });
			linksHandler.RemovePageFromLinks(page.PageID);

			// this will delete the layout if the page is the only one associated with it.
			var deleteLayoutHandler = _objectFactory.GetInstance<DeleteLayoutDeleteHandler>();
			deleteLayoutHandler.DeleteLayoutIfLastUsed(page.PageLayoutID ?? 0);

			page.PageLayoutID = 0;
			page.Layout = new PageLayout
			{
				Title = page.Title,
				ParentPageID = page.PageID,
				UserName = page.AuthorsUserName,
				PageTypeKey = page.PageType == null ? page.PageTypeKey : page.PageType.Key
			};

			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
