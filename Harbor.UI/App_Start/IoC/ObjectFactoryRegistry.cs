using Harbor.Data;
using Harbor.Domain;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;
using StructureMap.Web;

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