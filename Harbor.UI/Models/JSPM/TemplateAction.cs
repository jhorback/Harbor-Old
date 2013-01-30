
namespace Harbor.UI.Models.JSPM
{
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
}