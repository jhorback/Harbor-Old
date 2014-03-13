using Harbor.Domain;
using StructureMap;

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
	}
}