using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;
using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class ApplicationPkg : JavaScriptPackage
	{
		public const string PackageName = "Application";

		public ApplicationPkg()
		{
			Name = PackageName;
			ScriptBundle = getAppBundle();
			RequiresRegistration = false;
			Category = Categories.MVFramework;
		}

		Bundle getAppBundle()
		{
            var appBundle = new ScriptBundle("~/Scripts/app.js");
            appBundle.Include("~/Scripts/underscore.js");
            appBundle.Include("~/Scripts/backbone.js");
            appBundle.Include("~/Scripts/framework/contextjs/context.js");
            appBundle.Include("~/Scripts/framework/contextjs/app.js");
            appBundle.Include("~/Scripts/apps/appShim.js");
            appBundle.IncludeDirectory("~/Scripts/framework/appui", "*.js", searchSubdirectories: true);
            appBundle.IncludeDirectory("~/Scripts/framework/bbext", "*.js", searchSubdirectories: true);
            appBundle.Include("~/Scripts/apps/AjaxRequestDefaultHandler.js");
			return appBundle;
		}
	}
}
