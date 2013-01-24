using System.Collections.Generic;
using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public class JavaScriptPackage : IJavaScriptPackage
	{
		public JavaScriptPackage()
		{
			RequiresRegistration = true;
		}

		public string Name { get; protected set; }
		public Bundle ScriptBundle { get; protected set; }
		public TemplateAction Templates { get; protected set; }
		public Bundle StyleBundle { get; protected set; }
		public string[] Dependencies { get; protected set; }
		public bool RequiresRegistration { get; protected set; }
		public string Category { get; protected set; }


		public JavaScriptPackage AddDependency(string packageName)
		{
			if (Dependencies == null)
				Dependencies = new string[] {};

			var list = new List<string>(Dependencies) {packageName};
			Dependencies = list.ToArray();
			return this;
		}
	}
}