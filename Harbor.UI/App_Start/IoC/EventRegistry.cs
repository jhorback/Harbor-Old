using System;
using Harbor.Domain;
using Harbor.Domain.App;
using Harbor.Domain.Event;
using StructureMap.Configuration.DSL;

namespace Harbor.UI.IoC
{
	public class EventRegistry : Registry
	{
		public EventRegistry()
		{
			For(typeof(IEventPublisher<>)).Use(typeof(EventPublisher<>));
			registerAllGenericImplementationsFor(typeof(IEventSubscriber<>));
		}

		/// <summary>
		/// <![CDATA[
		///   Looks for all implementations of IEventSubscriber<>
		///   then adds each implementation to be returned when calling with a specific generic.
		///   This is to support returning things such as all implementations of: IEventSubscriber<SomeEvent>
		/// ]]>
		/// </summary>
		void registerAllGenericImplementationsFor(Type genericType)
		{
			var reflectionUtils = new ReflectionUtils();
			var implementingTypes = reflectionUtils.GetTypesImplementingGenericType(genericType, typeof(HarborApp).Assembly);

			foreach (var type in implementingTypes)
			{
				// AsImplementedInterfaces
				foreach (var implementedInterface in type.GetInterfaces())
				{
					For(implementedInterface).Add(type);
				}
			}
		}
	}
}