using Harbor.Domain.Command;
using Harbor.Domain.Pages.Content;

namespace Harbor.Domain.Pages.Commands
{
	public class AddExistingPageToLinks : PageCommand
	{
		public int ExistingPageID { get; set; }
		public int SectionIndex { get; set; }
	}

	public class AddExistingPageToLinksHandler : ICommandHandler<AddExistingPageToLinks>
	{
		private readonly IPageRepository _pageRepository;

		public AddExistingPageToLinksHandler(IPageRepository pageRepository)
		{
			_pageRepository = pageRepository;
		}

		public void Handle(AddExistingPageToLinks command)
		{
			var page = _pageRepository.FindById(command.PageID);
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


			var existingPage = _pageRepository.FindById(command.ExistingPageID);
			if (existingPage == null)
			{
				throw new DomainValidationException("Page being linked does not exist.");
			}


			// Update the layout
			if (page.Layout.ParentPageID == null)
			{
				page.Layout.ParentPageID = page.PageID;
			}
			existingPage.PageLayoutID = page.PageLayoutID;
			existingPage.Layout = page.Layout;

			section.links.Add(new Links.LinksSectionLink
			{
				pageID = existingPage.PageID,
				text = existingPage.Title
			});
			links.EnsureIds();
			page.Layout.SetAsideData(links);


			_pageRepository.Update(existingPage);
			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
