
using Common.UI.Models;

namespace Common.UI.Scripts
{
	public class FeedbackJsPackageRegistration : JsPackageRegistration
	{
		public override string Name
		{
			get { return "Feedback"; }
		}

		public override string Description
		{
			get { return "Provides a feedback message while the user is waiting for an async call to finish."; }
		}

		public override void ConfigureJsPackage(JsPackageConfig config)
		{
			config.AddDependency("~/Scripts/jquery.ui.widget.js");
			config.AddDependency("~/Scripts/ui.message/ui.message.js");
		}
	}
}