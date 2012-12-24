
using Common.UI.Models;

namespace Common.UI.Scripts
{
	public class UISelectListJsPackageRegistration : JsPackageRegistration
	{
		public override string Name
		{
			get { return "ui.selectlist"; }
		}

		public override string Description
		{
			get
			{
				return @"Adds behavior to list selection. Works with any kind of list (i.e. tr, li, etc.). 
					Works with checkboxes, radiobuttons, and hyperlinks.";
			}
		}

		public override void ConfigureJsPackage(JsPackageConfig config)
		{
			config.AddDependency("~/Scripts/jquery.ui.widget.js");
		}
	}
}