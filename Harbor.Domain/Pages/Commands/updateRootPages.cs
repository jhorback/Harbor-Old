using Harbor.Domain.App;
using Harbor.Domain.Command;

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

		public UpdateRootPagesHandler(IRootPagesRepository rootPagesRepository)
		{
			_rootPagesRepository = rootPagesRepository;
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
		}
	}
}
