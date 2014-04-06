using Harbor.Domain;
using StructureMap;
using StructureMap.Pipeline;

namespace Harbor.UI.IoC
{
	public class StructureMapObjectFactory : IObjectFactory
	{
		public T GetInstance<T>()
		{
			return ObjectFactory.GetInstance<T>();
		}

		public object GetInstance(System.Type type)
		{
			return ObjectFactory.GetInstance(type);
		}

		public T GetInstanceWithArgs<T>(System.Collections.Generic.IDictionary<string, object> args)
		{
			var arguments = new ExplicitArguments(args);
			return ObjectFactory.GetInstance<T>(arguments);
		}

		public object GetInstanceWithArgs(System.Type type, System.Collections.Generic.IDictionary<string, object> args)
		{
			var arguments = new ExplicitArguments(args);
			var container = ObjectFactory.Container;
			return container.GetInstance(type, arguments);
		}
	}
}