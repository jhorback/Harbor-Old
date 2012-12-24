using System.Collections.Generic;
using System.Linq;

namespace Common.UI.Models
{
	public class JsPackageRepository : IJsPackageRepository
	{
		static List<JsPackage> packages = new List<JsPackage>();

		static JsPackageRepository()
		{
			var reglist = JsPackageRegistrationProvider.Packages.OrderBy(p => p.Name);
			foreach (var reg in reglist)
			{
				var package = new JsPackage
				              	{
				              		Name = reg.Name,
				              		Description = reg.Description
				              	};

				var config = new JsPackageConfig(package);
				reg.ConfigureJsPackage(config);
				addTestScriptsToPackage(package);
				addScriptPathToPackage(package);
				addHtmlPathToPackage(package);
				packages.Add(config.Package);
			}
		}

		public IEnumerable<JsPackage> GetAllPackages()
		{
			return packages;
		}


		public JsPackage GetPackage(string name)
		{
			return GetAllPackages().FirstOrDefault(p => p.Name == name);
		}

		#region private
		private static void addTestScriptsToPackage(JsPackage package)
		{
			package.TestScripts = new List<string>();
			package.TestScripts.AddRange(getTestScriptsInFolder("~/Scripts/" + package.Name + "/"));
			package.TestScripts.AddRange(getTestScriptsInFolder("~/Scripts/" + package.Name + "/tests/"));
		}

		private static IEnumerable<string> getTestScriptsInFolder(string path)
		{
			var scripts = new List<string>();
			path = System.Web.VirtualPathUtility.ToAbsolute(path);

			try
			{
				var dir = System.Web.HttpContext.Current.Server.MapPath(path);
				var files = System.IO.Directory.GetFiles(dir);
				foreach (var file in files)
				{
					var fileName = System.IO.Path.GetFileName(file);
					if (fileName.ToLower().IndexOf("test.js", System.StringComparison.Ordinal) > -1)
					{
						scripts.Add(path + fileName);
					}
				}
			}
			catch (System.Exception)
			{
				
			}

			return scripts;
		}

		private static void addScriptPathToPackage(JsPackage package)
		{
			var path = System.Web.VirtualPathUtility.ToAbsolute("~/Scripts/" + package.Name + "/" + package.JsName);
			package.ScriptPath = path;
		}

		private static void addHtmlPathToPackage(JsPackage package)
		{
			var path = System.Web.VirtualPathUtility.ToAbsolute("~/Scripts/" + package.Name + "/" + package.Name + ".html");
			if (System.IO.File.Exists(System.Web.HttpContext.Current.Server.MapPath(path)))
			{
				package.HtmlPath = path;
			}
		}
		#endregion
	}
}