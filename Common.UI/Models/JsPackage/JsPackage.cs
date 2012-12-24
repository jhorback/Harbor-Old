using System.Collections.Generic;

namespace Common.UI.Models
{
	public class JsPackage
	{
		public JsPackage()
		{
			TestScripts = new List<string>();
			Dependencies = new List<string>();
		}
		
		/// <summary>
		/// The name of the package.
		/// This needs to match the folder name in the /Scripts/ folder where the package resides.
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Returns the name with ".js" appended.
		/// </summary>
		public string JsName
		{
			get { return Name + ".js"; }
		}

		/// <summary>
		/// The package description.
		/// </summary>
		public string Description { get; set; }

		/// <summary>
		/// The path to the script.
		/// </summary>
		public string ScriptPath { get; set; }

		/// <summary>
		/// The path to an optional html description/example/readme of the package.
		/// </summary>
		public string HtmlPath { get; set; }

		/// <summary>
		/// The list of virtual paths to all the test scripts found in the package folder.
		/// </summary>
		public List<string> TestScripts { get; set; }

		/// <summary>
		/// The list of all virtual paths to dependencies.
		/// The dependencies are added to the QUnit test page.
		/// </summary>
		public virtual List<string> Dependencies { get; set; }
	}
}