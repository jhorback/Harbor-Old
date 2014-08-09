
using Harbor.Domain.Pages.Content;

namespace Harbor.Domain.Pages.Commands
{
	public class AddNewPageToLinks : IPageCommand
	{
		public string User { get; set; }
		public int PageID { get; set; }
		public string Title { get; set; }
		public string PageType { get; set; }
		public int SectionIndex { get; set; }
	}

	public class AddNewPageToLinksHandler : IPageCommandHandler<AddNewPageToLinks>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IPageFactory _pageFactory;

		public AddNewPageToLinksHandler(IPageRepository pageRepository, IPageFactory pageFactory)
		{
			_pageRepository = pageRepository;
			_pageFactory = pageFactory;
		}

		public void Execute(AddNewPageToLinks command)
		{
			var page = _pageRepository.FindById(command.PageID, readOnly: false);
			var links = page.Layout.GetAsideAdata<Links>();


			var layoutId = page.Layout.PageLayoutID;
			var publish = page.Public;

			var newPage = _pageFactory.Create(command.User, command.PageType, command.Title, publish, layoutId);
			_pageRepository.Create(newPage);
			_pageRepository.Save();

			var section = links.sections[command.SectionIndex];
			if (section != null) // need more checking here for index
			{
				section.links.Add(new Links.LinksSectionLink
				{
					pageID = newPage.PageID,
					text = command.Title
				});
			}

			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
