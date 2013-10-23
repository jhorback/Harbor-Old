using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Harbor.Data.Repositories;
using Harbor.Domain.Security;

namespace Harbor.UI
{
	public class IoCConfig
	{
		public static void RegisterDependencies()
		{
			// Reference:
			//    Mvc: http://code.google.com/p/autofac/wiki/MvcIntegration
			//    WebApi: https://code.google.com/p/autofac/wiki/WebApiIntegration

			var container = getContainer();
			DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
			GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
		}



		private static IContainer getContainer()
		{
			var builder = new ContainerBuilder();
			var webAssembly = Assembly.GetExecutingAssembly();
			var domainAssembly = typeof(IUserRepository).Assembly;
			var dataAssembly = typeof(UserRepository).Assembly;


			// Register Mvc and Api controllers
			builder.RegisterControllers(webAssembly);
			builder.RegisterApiControllers(webAssembly);


			builder.RegisterModelBinders();


			// Register implementing interfaces: IFoo -> Foo
			builder.RegisterAssemblyTypes(webAssembly)
				.AsImplementedInterfaces()
				.AsSelf();
			builder.RegisterAssemblyTypes(domainAssembly)
				.AsImplementedInterfaces()
				.AsSelf();
			builder.RegisterAssemblyTypes(dataAssembly)
				.AsImplementedInterfaces()
				.AsSelf();


			// Register modules (located in the  AutofacModules folder)
			builder.RegisterAssemblyModules(webAssembly);


			// Inject HTTP Abstractions
			builder.RegisterModule(new AutofacWebTypesModule());


			return builder.Build();
		}
	}
}