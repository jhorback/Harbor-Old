
namespace Harbor.Domain.Event
{
	public interface IEventPublisher<in T>
	{
		void Publish();
		void Publish(T data);
	}
}
