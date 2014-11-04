using System.Threading.Tasks;

namespace Harbor.Domain.Command
{
	public interface ICommandExecutor<in T> where T : ICommand
	{
		void Execute(T command);
		Task ExecuteAsync(T command);
	}
}
