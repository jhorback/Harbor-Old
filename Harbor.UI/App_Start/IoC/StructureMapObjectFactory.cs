using System.Web.Routing;
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

		public T GetInstance<T>(object args) where T : class
		{
			return GetInstance(typeof(T), args) as T;
		}

		public object GetInstance(System.Type type, object args)
		{
			var rvd = new RouteValueDictionary(args);
			var arguments = new ExplicitArguments(rvd);
			var container = ObjectFactory.Container;
			return container.GetInstance(type, arguments);
		}
	}
}