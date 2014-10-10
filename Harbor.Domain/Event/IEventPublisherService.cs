
namespace Harbor.Domain.Event
{
	public interface IEventPublisherService
	{
		void Publish<T>(T @event) where T : IEvent;
	}
}
