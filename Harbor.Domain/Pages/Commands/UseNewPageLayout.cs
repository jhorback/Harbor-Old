
using Harbor.Domain.Pages.ContentTypes;
using Harbor.Domain.Pages.PipelineHandlers;

namespace Harbor.Domain.Pages.Commands
{
	public class ResetPageLayout : IPageCommand
	{
		public int PageID { get; set; }
	}

	public class ResetPageLayoutHandler : IPageCommandHandler<ResetPageLayout>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IObjectFactory _objectFactory;

		public ResetPageLayoutHandler(IPageRepository pageRepository, IObjectFactory objectFactory)
		{
			_pageRepository = pageRepository;
			_objectFactory = objectFactory;
		}

		public void Execute(ResetPageLayout command)
		{
			var page = _pageRepository.FindById(command.PageID, readOnly: false);

			// this will delete the layout if the page is the only one associated with it.
			var deleteLayoutHandler = _objectFactory.GetInstance<DeleteLayoutDeleteHandler>();
			deleteLayoutHandler.DeleteLayoutIfLastUsed(page.PageLayoutID ?? 0);

			// remove the link from the layout
			var linksHandler = _objectFactory.GetInstance<LinksHandler>(new { page = page });
			linksHandler.RemovePageFromLinks(page.PageID);


			page.PageLayoutID = 0;
			page.Layout = new PageLayout
			{
				Title = page.Title,
				UserName = page.AuthorsUserName
			};

			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
