using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Harbor.Domain.App;
using Harbor.UI.Models.JSPM;
using Harbor.UI.Models.Theming;

namespace Harbor.UI
{
	public class HarborApplication : System.Web.HttpApplication
	{
		public static string Version
		{
			get { return getApp().Version; }
		}

		public static  string FullVersion
		{
			get { return getApp().FullVersion; }
		}

		public static string AppName
		{
			get { return getApp().ApplicationName; }
		}

		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();

			IoCConfig.RegisterDependencies();
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			WebApiConfig.Register(GlobalConfiguration.Configuration);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			PackageConfig.RegisterPackages(PackageTable.Packages, BundleTable.Bundles);
			ModelBinderConfig.RegisterModelBinders(ModelBinders.Binders);
			ThemeConfig.RegisterThemes(ThemeTable.Themes, BundleTable.Bundles);
			DbConfig.SetupDatabase();
			Bootstrapper.ExecuteTasks();
		}

		private static HarborApp getApp()
		{
			// jch* - request lifetime for this?
			var appRep = DependencyResolver.Current.GetService<IHarborAppRepository>();
			var app = appRep.GetApp();
			return app ?? new HarborApp();
		}
	}
}

