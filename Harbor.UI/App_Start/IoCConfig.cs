﻿using System.Web.Http;
using System.Web.Mvc;
using Harbor.Data.Repositories;
using Harbor.Domain.Security;
using Harbor.UI.IoC;
using StructureMap;


namespace Harbor.UI
{
	public class IoCConfig
	{
		public static void RegisterDependencies()
		{
			var container = getContainer();

			DependencyResolver.SetResolver(new StructureMapDependencyResolver(container));
			GlobalConfiguration.Configuration.DependencyResolver = new StructureMapDependencyResolver(container);
		}

		private static IContainer getContainer()
		{
			ObjectFactory.Initialize(x => x.Scan(scan =>
			{
				scan.WithDefaultConventions();

				// Harbor.UI
				scan.TheCallingAssembly();
				// Harbor.Domain
				scan.AssemblyContainingType(typeof(IUserRepository));
				// Harbor.Data
				scan.AssemblyContainingType(typeof(UserRepository));

				// add the bootstrapper tasks to the container
				scan.AddAllTypesOf<IBootstrapperTask>();

				// manual registries
				scan.LookForRegistries();
			}));

			return ObjectFactory.Container;
		}	
	}
}

// for autofac
// Reference:
//    Mvc: http://code.google.com/p/autofac/wiki/MvcIntegration
//    WebApi: https://code.google.com/p/autofac/wiki/WebApiIntegration
// DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
// GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
//private static IContainer getContainer()
//{
//	var builder = new ContainerBuilder();
//	var webAssembly = Assembly.GetExecutingAssembly();
//	var domainAssembly = typeof(IUserRepository).Assembly;
//	var dataAssembly = typeof(UserRepository).Assembly;


//	// Register Mvc and Api controllers
//	builder.RegisterControllers(webAssembly);
//	builder.RegisterApiControllers(webAssembly);
//	builder.RegisterModelBinders(webAssembly);


//	// Allow action filters to have property injection
//	builder.RegisterFilterProvider();
//	//builder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);


//	// Register implementing interfaces: IFoo -> Foo
//	builder.RegisterAssemblyTypes(webAssembly, domainAssembly, dataAssembly)
//		.AsImplementedInterfaces();
//		//.InstancePerHttpRequest();


//	// Register modules (located in the  AutofacModules folder)
//	builder.RegisterAssemblyModules(webAssembly);


//	// Inject HTTP Abstractions
//	builder.RegisterModule(new AutofacWebTypesModule());


//	return builder.Build();
//}