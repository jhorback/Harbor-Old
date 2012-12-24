
using Common.UI.Models;

namespace Common.UI.Scripts
{
	public class ValidationModelExtensionJsPackage : JsPackageRegistration
	{
		public override string Name
		{
			get { return "ValidationModelExtension"; }
		}

		public override string Description
		{
			get { return "A model validator for Backbone.js"; }
		}

		public override void ConfigureJsPackage(JsPackageConfig config)
		{
			config.AddDependency("~/Scripts/jquery.ui.widget.js");
		}
	}
}