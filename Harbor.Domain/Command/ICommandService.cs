using System.Threading.Tasks;

namespace Harbor.Domain.Command
{
	public interface ICommandService
	{
		void Execute<T>(T command) where T : ICommand;
		Task ExecuteAsync<T>(T command) where T : ICommand;
	}
}
