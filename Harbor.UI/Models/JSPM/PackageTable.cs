
using System.Web.Optimization;

namespace Harbor.UI.Models.JSPM
{
	public static class PackageTable
	{
		static PackageTable()
		{
			Packages = new PackageCollection();
		}

		public static PackageCollection Packages { get; private set; }
	}



	public class TemplateAction
	{
		public TemplateAction() { }

		public TemplateAction(string action, string controller)
		{
			Action = action;
			Controller = controller;
		}

		public TemplateAction(string action, string controller, string routeValues)
		{
			Action = action;
			Controller = controller;
			RouteValues = RouteValues;
		}

		public string Action { get; set; }
		public string Controller { get; set; }
		public object RouteValues { get; set; }
	}


	public class JstTemplateAction : TemplateAction
	{
		/// <summary>
		/// Creates a TemplateAction for the HomeController JST action
		/// passing the viewpath relative to the views folder. (no need for the .cshtml extension).
		/// </summary>
		/// <param name="viewpath"></param>
		public JstTemplateAction(string viewpath) : base ("jst", "home")
		{
			this.RouteValues = new
			    {
					viewpath = viewpath
			    };
		}
	}
}