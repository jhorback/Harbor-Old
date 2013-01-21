using System.Collections.Generic;
using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public interface IJavaScriptPackageRepository
	{
		IEnumerable<IJavaScriptPackage> GetPackages();

		IJavaScriptPackage GetPackage(string name);

		/// <summary>
		/// Adds all bundles from all packages.
		/// </summary>
		/// <param name="bundles"></param>
		void RegisterBundles(BundleCollection bundles);
	}
}
