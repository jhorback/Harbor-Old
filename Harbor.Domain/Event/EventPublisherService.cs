
namespace Harbor.Domain.Event
{
	public class EventPublisherService : IEventPublisherService
	{
		private readonly IObjectFactory _objectFactory;

		public EventPublisherService(IObjectFactory objectFactory)
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
