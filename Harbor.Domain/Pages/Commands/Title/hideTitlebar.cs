using Harbor.Domain.Command;

namespace Harbor.Domain.Pages.Commands
{
	public class HideTitleBar : PageCommand
	{
		public bool Hide { get; set; }
	}

	public class HideTitleBarHandler : ICommandHandler<HideTitleBar>
	{
		private readonly IPageRepository _pageRepository;

		public HideTitleBarHandler(IPageRepository pageRepository)
		{
			_pageRepository = pageRepository;
		}

		public void Handle(HideTitleBar command)
		{
			var page = _pageRepository.FindById(command.PageID);

			page.TitleProperties.DisplayNone = command.Hide;
			if (command.Hide)
			{
				page.TitleProperties.BackgroundEnabled = false;
			}
			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
