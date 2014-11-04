
namespace Harbor.Domain.Event
{
	public interface IEventSubscriber<in T>
	{
		void Handle(T data);
	}
}
