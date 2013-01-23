using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public interface IJavaScriptPackage
	{
		string Name { get; }
		Bundle ScriptBundle { get; }
		Bundle StyleBundle { get; }
		TemplateAction Templates { get; }

		/// <summary>
		/// If true, a JSPM.register("PackageName") script will be added by the InstallJavaScriptPackage Html helper.
		/// </summary>
		bool RequiresRegistration { get; }

		/// <summary>
		/// An array of package names to load before loading this package.
		/// </summary>
		string[] Dependencies { get; }
	}
}
