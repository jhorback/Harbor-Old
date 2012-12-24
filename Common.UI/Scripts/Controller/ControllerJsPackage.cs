
using Common.UI.Models;

namespace Common.UI.Scripts
{
	public class ControllerJsPackage : JsPackageRegistration
	{
		public override string Name
		{
			get { return "Controller"; }
		}

		public override string Description
		{
			get { return "A router extension that supports view lifetime management."; }
		}

		public override void ConfigureJsPackage(JsPackageConfig config)
		{
		}
	}
}