using System.Collections.Generic;
using Common.UI.Models.App;

namespace Common.UI.Models
{
	public static class JsPackageRegistrationProvider
	{
		static IEnumerable<JsPackageRegistration> packages;

		public static IEnumerable<JsPackageRegistration> Packages
		{
			get { return packages ?? (packages = getPackages()); }
		}

		static IEnumerable<JsPackageRegistration> getPackages()
		{
			return TypeFinder.GetInstances<JsPackageRegistration>();
		}
	}
}