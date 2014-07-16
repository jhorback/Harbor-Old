using Harbor.Data;
using StructureMap.Configuration.DSL;
using StructureMap.Web;

namespace Harbor.UI.IoC
{
	public class HarborContextRegistry : Registry
	{
		public HarborContextRegistry()
		{
			For<HarborContext>().HttpContextScoped();
		}
	}
}