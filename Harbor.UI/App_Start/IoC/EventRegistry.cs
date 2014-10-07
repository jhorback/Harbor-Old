using System;
using System.Linq;
using Harbor.Domain.App;
using Harbor.Domain.Event;
using StructureMap.Configuration.DSL;

namespace Harbor.UI.IoC
{
	public class EventRegistry : Registry
	{
		/// <summary>
		/// <![CDATA[
		///   Looks for all implementations of IEventSubscriber<>
		///   then adds each implementation to be returned when calling with a specific generic.
		///   This is to support returning things such as all implementations of: IEventSubscriber<SomeEvent>
		/// ]]>
		/// </summary>
		public EventRegistry()
		{
			var genericRepositoryType = typeof (IEventSubscriber<>);
			var assemblyToSearch = typeof (HarborApp).Assembly;
			
			var types = assemblyToSearch.GetExportedTypes()
				.Where(t => !t.IsInterface && !t.IsAbstract)
				.Where(t => IsAssignableToGenericType(t, genericRepositoryType))
				.ToArray();

			foreach (var type in types)
			{
				foreach (var implementedInterface in type.GetInterfaces())
				{
					For(implementedInterface).Add(type);
				}
			}
		}

		private static bool IsAssignableToGenericType(Type givenType, Type genericType)
		{
			var interfaceTypes = givenType.GetInterfaces();

			if (interfaceTypes.Where(it => it.IsGenericType).Any(it => it.GetGenericTypeDefinition() == genericType))
				return true;

			var baseType = givenType.BaseType;
			if (baseType == null) return false;

			return baseType.IsGenericType &&
				   baseType.GetGenericTypeDefinition() == genericType ||
				   IsAssignableToGenericType(baseType, genericType);
		}
	}
}