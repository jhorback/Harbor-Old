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
            var appBundle = new ScriptBundle("~/Scripts/app.js")
                .Include("~/scripts/lib/underscore/underscore.js")
                .Include("~/scripts/lib/backbone/backbone.js")
                .Include("~/Scripts/framework/contextjs/context.js")
                .Include("~/Scripts/framework/contextjs/module.js")
                .Include("~/Scripts/apps/appShim.js")
                .IncludeDirectory("~/Scripts/framework/appui", "*.js", searchSubdirectories: true)
                .IncludeDirectory("~/Scripts/framework/bbext", "*.js", searchSubdirectories: true)
                .Include("~/Scripts/apps/AjaxRequestDefaultHandler.js");
			return appBundle;
		}
    }
}
