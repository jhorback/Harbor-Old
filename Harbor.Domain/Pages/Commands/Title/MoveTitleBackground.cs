using Harbor.Domain.Command;

namespace Harbor.Domain.Pages.Commands
{
	public class MoveTitleBackground : PageCommand
	{
		public string Position { get; set; }
	}

	public class MoveTitleBackgroundHandler : ICommandHandler<MoveTitleBackground>
	{
		private readonly IPageRepository _pageRepository;

		public MoveTitleBackgroundHandler(IPageRepository pageRepository)
		{
			_pageRepository = pageRepository;
		}

		public void Handle(MoveTitleBackground command)
		{
			var page = _pageRepository.FindById(command.PageID);

			page.TitleProperties.BackgroundPosition = command.Position;
			_pageRepository.Update(page);
			_pageRepository.Save();
		}
	}
}
