using Harbor.Domain.App;
using Harbor.Domain.Command;
using Harbor.Domain.Event;
using Harbor.Domain.Pages.Events;

namespace Harbor.Domain.Pages.Commands
{
	public class UpdateRootPages : PageCommand
	{
		public bool IsARootPage { get; set; }
		public string Name { get; set; }
	}

	public class UpdateRootPagesHandler : ICommandHandler<UpdateRootPages>
	{
		private readonly IRootPagesRepository _rootPagesRepository;
		private readonly IEventPublisher _eventPublisher;

		public UpdateRootPagesHandler(IRootPagesRepository rootPagesRepository, IEventPublisher eventPublisher)
		{
			_rootPagesRepository = rootPagesRepository;
			_eventPublisher = eventPublisher;
		}

		public void Handle(UpdateRootPages command)
		{
			if (command.IsARootPage)
			{
				_rootPagesRepository.AddRootPage(command.Name, command.PageID);
			}
			else
			{
				_rootPagesRepository.RemoveRootPage(command.Name);
			}

			_rootPagesRepository.Save();
			_eventPublisher.Publish(new PageChangedEvent {PageID = command.PageID});
		}
	}
}
