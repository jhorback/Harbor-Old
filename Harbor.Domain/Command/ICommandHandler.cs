
namespace Harbor.Domain.Command
{
	public interface ICommandHandler<in T>
	{
		void Handle(T command);
	}
}
