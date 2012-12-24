
using Common.UI.Models;

namespace Common.UI.Scripts
{
	public class UIMessageJsPackageRegistration : JsPackageRegistration
	{
		public override string Name
		{
			get { return "ui.message"; }
		}

		public override string Description
		{
			get { return " A simple message widget."; }
		}

		public override void ConfigureJsPackage(JsPackageConfig config)
		{
			config.AddDependency("~/Scripts/jquery.ui.widget.js");
		}
	}
}