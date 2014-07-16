using Harbor.Data;
using Harbor.Domain;
using StructureMap.Configuration.DSL;
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

	public class HarborContextRegistry : Registry
	{
		public HarborContextRegistry()
		{
			For<HarborContext>()
				.Use(new HarborContext())
				.SetLifecycleTo(WebLifecycles.HttpContext);
		}
	}
}