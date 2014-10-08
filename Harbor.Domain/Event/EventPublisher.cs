using System.Collections.Generic;

namespace Harbor.Domain.Event
{
	public class EventPublisher<T> : IEventPublisher<T>
	{
		private readonly IEnumerable<IEventSubscriber<T>> _consumers;

		public EventPublisher(IEnumerable<IEventSubscriber<T>> consumers)
		{
			_consumers = consumers;
		}

		public void Publish(T data)
		{
			foreach (var consumer in _consumers)
			{
				consumer.Handle(data);
			}
		}

		public void Publish()
		{
			Publish(default(T));
		}
	}
}
