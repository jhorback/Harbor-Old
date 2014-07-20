using Harbor.Data;
using StructureMap.Configuration.DSL;
using StructureMap.Web;

namespace Harbor.UI.IoC
{
	public class UnitOfWorkRegistry : Registry
	{
		public UnitOfWorkRegistry()
		{
			For<IUnitOfWork>().HttpContextScoped();
		}
	}
}