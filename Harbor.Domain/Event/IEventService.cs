
namespace Harbor.Domain.Event
{
	public interface IEventService
	{
		void Publish<T>(T @event) where T : IEvent;
		void Publish<T>() where T : IEvent;
	}
}
