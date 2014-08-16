using Harbor.Domain.Pages.Content;

namespace Harbor.Domain.Pages.Commands
{
	public class AddExistingPageToLinks : IPageCommand
	{
		public int PageID { get; set; }
		public int ExistingPageID { get; set; }
		public int SectionIndex { get; set; }
	}

	public class AddExistingPageToLinksHandler : IPageCommandHandler<AddExistingPageToLinks>
	{
		private readonly IPageRepository _pageRepository;

		public AddExistingPageToLinksHandler(IPageRepository pageRepository)
		{
			_pageRepository = pageRepository;
		}

		public void Execute(AddExistingPageToLinks command)
		{
			var page = _pageRepository.FindById(command.PageID, readOnly: false);
			var links = page.Layout.GetAsideAdata<Links>();
			if (links == null)
			{
				throw new DomainValidationException("Page does not contain links.");
			}


			var section = links.sections[command.SectionIndex];
			if (section == null)
			{
				throw new DomainValidationException("Links section does not exist.");
			}


			var existingPage = _pageRepository.FindById(command.ExistingPageID, readOnly: false);
			if (existingPage == null)
			{
				throw new DomainValidationException("Page being linked does not exist.");
			}


			// Update the layout
			existingPage.PageLayoutID = page.PageLayoutID;
			existingPage.Layout = page.Layout;

			section.links.Add(new Links.LinksSectionLink
			{
				pageID = existingPage.PageID,
				text = existingPage.Title
			});
			links.EnsureIds();


			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
