using Harbor.Data;
using StructureMap.Configuration.DSL;
using StructureMap.Web;

namespace Harbor.UI.IoC
{
	public class UnitOfWorkRegistry : Registry
	{
		public UnitOfWorkRegistry()
		{
			StructureMap.Web.WebLifecycles.HttpContext
			For<IUnitOfWork>().HttpContextScoped();
		}
	}
}