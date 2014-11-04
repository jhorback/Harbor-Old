using System;
using System.Threading.Tasks;

namespace Harbor.Domain.Command
{
	public class CommandService : ICommandService
	{
		private readonly IObjectFactory _objectFactory;

		public CommandService(IObjectFactory objectFactory)
		{
			_objectFactory = objectFactory;
		}

		public void Execute<T>(T command) where T : ICommand
		{
			guardArgs(command);

			var executor = _objectFactory.GetInstance<ICommandExecutor<T>>();
			executor.Execute(command);
		}

		public Task ExecuteAsync<T>(T command) where T : ICommand
		{
			guardArgs(command);
			
			var executor = _objectFactory.GetInstance<ICommandExecutor<T>>();
			return executor.ExecuteAsync(command);
		}

		private void guardArgs<T>(T argument)
		{
			if (typeof(T) == typeof(ICommand))
			{
				throw new Exception(string.Format("Cannot determine command from ICommand: {0}", argument.GetType()));
			}
		}
	}
}
