using System.Web.Optimization;
using Harbor.UI.JSPkgs;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI
{
	public class PackageConfig
	{
		public static void RegisterPackages(PackageCollection packages, BundleCollection bundles)
		{
			// ignore any tests in bundles
			bundles.IgnoreList.Ignore("*.test.js", OptimizationMode.Always);
			
			packages.Bundles = bundles;

			packages.Add(new ApplicationPkg());
			packages.Add(new AppUIPkg());
			packages.Add(new CurrentUserModelPkg());
			packages.Add(new CurrentPageModelPkg());
			packages.Add(new JQueryPkg());
			packages.Add(new FileAdminAppPkg());
			packages.Add(new FileModelPkg());
			packages.Add(new FileSelectorPkg());
			packages.Add(new Html5UploaderPkg());
			packages.Add(new JQueryUICorePkg());
			packages.Add(new JQueryUIInteractionsPkg());
			packages.Add(new ModernizrShivPkg());
			packages.Add(new PageAdderPkg());
			packages.Add(new PageEditorPkg());
			packages.Add(new PageLoaderAppPkg());
			packages.Add(new PageModelPkg());
			packages.Add(new PageAdminAppPkg());
			packages.Add(new PageSelectorPkg());
			packages.Add(new PageSettingsPkg());
			packages.Add(new PayPalButtonModelPkg());
			packages.Add(new RedactorPkg());
			packages.Add(new SessionAppPkg());
			packages.Add(new SettingsAppPkg());
			packages.Add(new SiteStylePkg());
			packages.Add(new UserAccountAppPkg());
			packages.Add(new UserAdminAppPkg());
			packages.Add(new UserModelPkg());
		}
	}
}