
namespace Harbor.Domain.Event
{
	public interface IEventPublisher<in T> where T : IEvent
	{
		void Publish();
		void Publish(T data);
	}
}
