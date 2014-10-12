
using System;

namespace Harbor.Domain.Event
{
	public class EventPublisher : IEventPublisher
	{
		private readonly IObjectFactory _objectFactory;

		public EventPublisher(IObjectFactory objectFactory)
		{
			_objectFactory = objectFactory;
		}

		public void Publish<T>(T @event) where T : IEvent
		{
			guardArgs(@event);

			var publisher = _objectFactory.GetInstance<IEventPublisher<T>>();
			publisher.Publish(@event);
		}

		public void Publish<T>() where T : IEvent
		{
			Publish(default(T));
		}

	
		private void guardArgs<T>(T argument)
		{
			// the T cannot be IEvent, must be a specific event
			if (typeof(T) == typeof(IEvent))
			{
				throw new Exception(string.Format("Cannot determine command from IEvent: {0}", argument.GetType()));
			}
		}
	}
}
