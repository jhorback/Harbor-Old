using Harbor.Domain.Command;

namespace Harbor.Domain.Pages.Commands
{
	public class EnableTitleBackground : PageCommand
	{
		public bool Enable { get; set; }
	}

	public class EnableTitleBackgroundHandler : ICommandHandler<EnableTitleBackground>
	{
		private readonly IPageRepository _pageRepository;

		public EnableTitleBackgroundHandler(IPageRepository pageRepository)
		{
			_pageRepository = pageRepository;
		}

		public void Handle(EnableTitleBackground command)
		{
			var page = _pageRepository.FindById(command.PageID);

			page.TitleBackgroundEnabled = command.Enable;
			if (command.Enable)
			{
				page.TitleDispalyNone = false;
			}
			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
