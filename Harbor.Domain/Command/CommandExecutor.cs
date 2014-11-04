using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;

namespace Harbor.Domain.Command
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
			return new TaskFactory().StartNew((httpContext) =>
			{
				HttpContext.Current = httpContext as HttpContext;
				Execute(command);
			}, HttpContext.Current);
		}
	}
}
