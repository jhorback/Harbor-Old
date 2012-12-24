
using Common.UI.Models;

namespace Common.UI.Scripts
{
	public class ModelBinderJsPackage : JsPackageRegistration
	{
		public override string Name
		{
			get { return "ModelBinder"; }
		}

		public override string Description
		{
			get { return "A generic two way model binder."; }
		}

		public override void ConfigureJsPackage(JsPackageConfig config)
		{
			// config.AddDependency("~/Scripts/jquery.ui.widget.js");
		}
	}
}