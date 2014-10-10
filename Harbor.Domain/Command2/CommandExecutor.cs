using System.Collections.Generic;
using System.Threading.Tasks;

namespace Harbor.Domain.Command2
{
	public class CommandExecutor<T> : ICommandExecutor<T> where T : ICommand
	{
		private readonly IEnumerable<ICommandHandler<T>> _handlers;

		public CommandExecutor(IEnumerable<ICommandHandler<T>> handlers)
		{
			_handlers = handlers;
		}

		public void Execute(T command)
		{
			foreach (var handler in _handlers)
			{
				handler.Handle(command);				
			}
		}

		public Task ExecuteAsync(T command)
		{
			return new TaskFactory().StartNew(() => Execute(command));
		}
	}
}
