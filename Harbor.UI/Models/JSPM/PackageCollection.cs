using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public class PackageCollection : IEnumerable<IJavaScriptPackage>, IEnumerable
	{
		List<IJavaScriptPackage> packages = new List<IJavaScriptPackage>();

		public IEnumerator<IJavaScriptPackage> GetEnumerator()
		{
			return packages.GetEnumerator();
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return packages.GetEnumerator();
		}

		public void Add(IJavaScriptPackage package)
		{
			packages.Add(package);
		}

		public void Add(IJavaScriptPackage package, BundleCollection bundles)
		{
			packages.Add(package);
			if (package.ScriptBundle != null)
				bundles.Add(package.ScriptBundle);
			if (package.StyleBundle != null)
				bundles.Add(package.StyleBundle);
		}

		public IJavaScriptPackage GetPackage(string name)
		{
			return packages.FirstOrDefault(p => p.Name == name);
		}

		public void Clear()
		{
			packages.Clear();
		}

		public ReadOnlyCollection<IJavaScriptPackage> GetRegisteredPackages()
		{
			return packages.AsReadOnly();
		}
	}
}