﻿using Harbor.UI.Models.JSPM;

namespace Harbor.UI.JSPkgs
{
	public class SessionAppPkg : JavaScriptPackage
	{
		public const string PackageName = "Session";

		public SessionAppPkg()
		{
			Name = PackageName;
			ScriptBundle = new AppScriptBundle(PackageName);
			Templates = new JstTemplateAction("Session/Index");
			RequiresRegistration = false;
			Category = Categories.Apps;
			AddDependency(CurrentUserModelPkg.PackageName);
			AddDependency(PageAdderPkg.PackageName); // jch! - will remove
		}
	}
}
