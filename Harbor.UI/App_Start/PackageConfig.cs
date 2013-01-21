using System.Web.Optimization;
using Harbor.UI.JSPkgs;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI
{
	public class PackageConfig
	{
		public static void RegisterPackages(PackageCollection packages, BundleCollection bundles)
		{
			packages.Add(new SettingsPkg(), bundles);
			packages.Add(new UserAccountPkg(), bundles);
			packages.Add(new UserAdminPkg(), bundles);
			packages.Add(new UserModelPkg(), bundles);
		}
	}
}