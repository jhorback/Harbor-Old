using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public interface IJavaScriptPackage
	{
		string Name { get; }
		Bundle ScriptBundle { get; }
		Bundle StyleBundle { get; }
		string[] Templates { get; }

		/// <summary>
		/// An array of package names to load before loading this package.
		/// </summary>
		string[] Dependencies { get; }
	}
}
