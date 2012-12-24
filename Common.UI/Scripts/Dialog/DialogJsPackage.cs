
using Common.UI.Models;

namespace Common.UI.Scripts
{
	public class DialogJsPackageRegistration : JsPackageRegistration
	{
		public override string Name
		{
			get { return "Dialog"; }
		}

		public override string Description
		{
			get { return "Wraps an element in a dialog with a few options for configuration."; }
		}

		public override void ConfigureJsPackage(JsPackageConfig config)
		{
			config.AddDependency("~/Scripts/jquery.ui.position.js");
			config.AddDependency("~/Scripts/jquery.ui.core.js");
			config.AddDependency("~/Scripts/jquery.ui.widget.js");
			config.AddDependency("~/Scripts/jquery.ui.mouse.js");
			config.AddDependency("~/Scripts/jquery.ui.draggable.js");
		}
	}
}