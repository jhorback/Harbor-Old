using System.Threading.Tasks;

namespace Harbor.Domain.Command2
{
	public class CommandExecutor<T> : ICommandExecutor<T> where T : ICommand
	{
		private readonly ICommandHandler<T> _handler;

		public CommandExecutor(ICommandHandler<T> handler)
		{
			_handler = handler;
		}

		public void Execute(T command)
		{
			_handler.Handle(command);
		}

		public Task ExecuteAsync(T command)
		{
			return new TaskFactory().StartNew(() => Execute(command));
		}
	}
}
