using System.Security.Principal;
using Harbor.Domain.Command;
using Harbor.Domain.Pages.Content;

namespace Harbor.Domain.Pages.Commands
{
	public class AddNewPageToLinks : PageCommand
	{
		public string Title { get; set; }
		public string PageType { get; set; }
		public int SectionIndex { get; set; }
	}

	public class AddNewPageToLinksHandler : ICommandHandler<AddNewPageToLinks>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IPageFactory _pageFactory;
		private readonly IPrincipal _user;

		public AddNewPageToLinksHandler(IPageRepository pageRepository, IPageFactory pageFactory, IPrincipal user)
		{
			_pageRepository = pageRepository;
			_pageFactory = pageFactory;
			_user = user;
		}

		public void Handle(AddNewPageToLinks command)
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


			// create the new page
			var layoutId = page.Layout.PageLayoutID;
			var publish = page.Public;
			var newPage = _pageFactory.Create(_user.Identity.Name, command.PageType, command.Title, publish, layoutId);
			_pageRepository.Create(newPage);
			_pageRepository.Save();


			section.links.Add(new Links.LinksSectionLink
			{
				pageID = newPage.PageID,
				text = command.Title
			});
			links.EnsureIds();
			page.Layout.SetAsideData(links);


			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
