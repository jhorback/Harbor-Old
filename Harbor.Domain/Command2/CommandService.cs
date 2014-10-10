using System.Threading.Tasks;

namespace Harbor.Domain.Command2
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
			var executor = _objectFactory.GetInstance<ICommandExecutor<T>>();
			executor.Execute(command);
		}

		public Task ExecuteAsync<T>(T command) where T : ICommand
		{
			var executor = _objectFactory.GetInstance<ICommandExecutor<T>>();
			return executor.ExecuteAsync(command);
		}
	}
}
