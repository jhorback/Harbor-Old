
namespace Harbor.Domain.Command2
{
	public interface ICommandHandler<in T>
	{
		void Handle(T command);
	}
}
