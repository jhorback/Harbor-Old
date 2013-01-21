using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.UI.Models.JSPM
{
	public class JavaScriptPackageRepository : IJavaScriptPackageRepository
	{
		IEnumerable<IJavaScriptPackage> packages;

		/// <summary>
		/// Uses reflection to find all IJavaScriptPackage implementations in the current assembly.
		/// </summary>
		public JavaScriptPackageRepository()
		{
			loadPackagesFromAssembly();
		}

		public JavaScriptPackageRepository(IEnumerable<IJavaScriptPackage> packages)
		{
			this.packages = packages;
			if (this.packages.Count() == 0)
			{
				loadPackagesFromAssembly();
			}
		}

		public IJavaScriptPackage GetPackage(string name)
		{
			return packages.FirstOrDefault(p => p.Name == name);
		}

		public void RegisterBundles(System.Web.Optimization.BundleCollection bundles)
		{
			foreach (var pkg in packages)
			{
				if (pkg.ScriptBundle != null)
					bundles.Add(pkg.ScriptBundle);
				if (pkg.StyleBundle != null)
					bundles.Add(pkg.StyleBundle);
			}
		}

		public IEnumerable<IJavaScriptPackage> GetPackages()
		{
			return packages;
		}

		private void loadPackagesFromAssembly()
		{
			var type = typeof(IJavaScriptPackage);
			var types = AppDomain.CurrentDomain.GetAssemblies().ToList()
				.SelectMany(s => s.GetTypes())
				.Where(type.IsAssignableFrom);


			List<IJavaScriptPackage> list = new List<IJavaScriptPackage>();
			foreach (Type packageType in types)
			{
				try
				{
					list.Add((IJavaScriptPackage) Activator.CreateInstance(packageType));
				}
				catch (Exception)
				{
					// caused when attempting to create the interface itslef
					// thought IsAssignableFrom filtered this out?
				}
			}
			packages = list;
		}
	}
}