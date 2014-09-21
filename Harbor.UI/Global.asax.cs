using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Harbor.Domain;
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

		public static string FullVersion
		{
			get { return getApp().FullVersion; }
		}

		public static string AppName
		{
			get { return getApp().ApplicationName; }
		}

		public static string GoogleAnalyticsAccount
		{
			get {
				return getApp().GoogleAnalyticsAccount;
			}
		}

		public static string FooterText
		{
			get
			{
				return getApp().FooterHtml;
			}
		}

		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();

			IoCConfig.RegisterDependencies();
			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			//WebApiConfig.Register(GlobalConfiguration.Configuration);
			GlobalConfiguration.Configure(WebApiConfig.Register);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			PackageConfig.RegisterPackages(PackageTable.Packages, BundleTable.Bundles);
			ModelBinderConfig.RegisterModelBinders(ModelBinders.Binders);
			ThemeConfig.RegisterThemes(ThemeTable.Themes, BundleTable.Bundles);
			DbConfig.SetupDatabase();
			Bootstrapper.ExecuteTasks();
		}

		protected void Application_EndRequest()
		{
			IoCConfig.Dispose();
		}

		private static HarborApp getApp()
		{
			var appRep = DependencyResolver.Current.GetService<IHarborAppRepository>();
			var app = appRep.GetApp();
			return app ?? new HarborApp();
		}
	}
}

