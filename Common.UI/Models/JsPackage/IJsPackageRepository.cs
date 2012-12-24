using System.Collections.Generic;

namespace Common.UI.Models
{
	public interface IJsPackageRepository
	{
		/// <summary>
		/// Returns all packages.
		/// </summary>
		/// <returns></returns>
		IEnumerable<JsPackage> GetAllPackages();

		/// <summary>
		/// Returns the package with the specified name.
		/// </summary>
		/// <param name="name"></param>
		/// <returns></returns>
		JsPackage GetPackage(string name);
	}
}
