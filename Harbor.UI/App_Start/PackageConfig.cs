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
			packages.Add(new JQueryPkg());
			packages.Add(new FileAdminAppPkg());
			packages.Add(new FileModelPkg());
			packages.Add(new FileSelectorAppPkg());
			packages.Add(new Html5UploaderPkg());
			packages.Add(new JQueryUICorePkg());
			packages.Add(new JQueryUIInteractionsPkg());
			packages.Add(new ModernizrShivPkg());
			packages.Add(new PageAdderAppPkg());
			packages.Add(new PageEditorAppPkg());
			packages.Add(new PageLoaderAppPkg());
			packages.Add(new PageModelsPkg());
			packages.Add(new PagesAppPkg());
			packages.Add(new PageSelectorAppPkg());
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