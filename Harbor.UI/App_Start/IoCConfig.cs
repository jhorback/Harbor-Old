using System.Web.Http;
using System.Web.Mvc;
using Harbor.Data.Repositories;
using Harbor.Domain.App;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;
using StructureMap;
using System.Linq;

namespace Harbor.UI
{
	public class IoCConfig
	{
		public static void RegisterDependencies()
		{
			var container = IoCConfig.Initialize();
			DependencyResolver.SetResolver(new StructureMapDependencyResolver(container));
			GlobalConfiguration.Configuration.DependencyResolver = new StructureMapHttpDependencyResolver(container);
		}

		public static IContainer Initialize()
		{
			ObjectFactory.Initialize(x => x.Scan(scan =>
			{
				scan.WithDefaultConventions();
				scan.TheCallingAssembly();

				// Harbor.Domain
				scan.AssemblyContainingType(typeof(IUserRepository));
				// Harbor.Data
				scan.AssemblyContainingType(typeof(UserRepository));

				// add the bootstrapper tasks to the container
				scan.AddAllTypesOf<IBootstrapperTask>();
				scan.AddAllTypesOf<ComponentType>();
			}));

			return ObjectFactory.Container;
		}
	}


}