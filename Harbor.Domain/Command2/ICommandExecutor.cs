using System.Threading.Tasks;

namespace Harbor.Domain.Command2
{
	public interface ICommandExecutor<in T> where T : ICommand
	{
		void Execute(T command);
		Task ExecuteAsync(T command);
	}
}
