
namespace Harbor.Domain.Event
{
	public class EventService : IEventService
	{
		private readonly IObjectFactory _objectFactory;

		public EventService(IObjectFactory objectFactory)
		{
			_objectFactory = objectFactory;
		}

		public void Publish<T>(T @event) where T : IEvent
		{
			var publisher = _objectFactory.GetInstance<IEventPublisher<T>>();
			publisher.Publish(@event);
		}
	}
}
