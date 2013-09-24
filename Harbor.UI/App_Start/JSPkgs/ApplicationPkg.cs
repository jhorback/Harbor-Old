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
				.Include("~/Scripts/underscore.js")
				.Include("~/Scripts/backbone.js")
				.Include("~/Scripts/contextjs/context.js")
				.Include("~/Scripts/contextjs/app.js")
				.Include("~/Scripts/Apps/appShim.js")
				.IncludeDirectory("~/Scripts/appui", "*.js", searchSubdirectories: true)
				.IncludeDirectory("~/Scripts/bbext", "*.js", searchSubdirectories: true)
				.IncludeDirectory("~/Scripts/bbextv1", "*.js", searchSubdirectories: true)
				.Include("~/Scripts/apps/AjaxRequestDefaultHandler.js");
			return appBundle;
		}
	}
}
