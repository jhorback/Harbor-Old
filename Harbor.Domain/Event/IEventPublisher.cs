
namespace Harbor.Domain.Event
{
	public interface IEventPublisher
	{
		void Publish<T>(T @event) where T : IEvent;
		void Publish<T>() where T : IEvent;
	}
}
