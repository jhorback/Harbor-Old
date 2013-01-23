using System.Web.Optimization;
using Harbor.UI.JSPkgs;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI
{
	public class PackageConfig
	{
		public static void RegisterPackages(PackageCollection packages, BundleCollection bundles)
		{
			packages.Add(new ApplicationPkg(), bundles);
			packages.Add(new JQueryPkg(), bundles);
			packages.Add(new JQueryUICorePkg(), bundles);
			packages.Add(new JQueryUIInteractionsPkg(), bundles);
			packages.Add(new PageModelsPkg(), bundles);
			packages.Add(new SessionPkg(), bundles);
			packages.Add(new SettingsPkg(), bundles);
			packages.Add(new UserAccountPkg(), bundles);
			packages.Add(new UserAdminPkg(), bundles);
			packages.Add(new UserModelPkg(), bundles);
		}
	}
}