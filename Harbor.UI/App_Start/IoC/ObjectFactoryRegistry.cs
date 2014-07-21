using Harbor.Domain;
using StructureMap.Configuration.DSL;

namespace Harbor.UI.IoC
{
	public class ObjectFactoryRegistry : Registry
	{
		public ObjectFactoryRegistry()
		{
			For<IObjectFactory>().Use(s => new StructureMapObjectFactory());
		}
	}
}