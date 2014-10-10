using System;
using Harbor.Domain;
using Harbor.Domain.App;
using Harbor.Domain.Command2;
using StructureMap.Configuration.DSL;

namespace Harbor.UI.IoC
{
	public class CommandRegistry : Registry
	{
		public CommandRegistry()
		{
			registerSingleGenericImplementationFor(typeof(ICommandHandler<>));
		}

		void registerSingleGenericImplementationFor(Type genericType)
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