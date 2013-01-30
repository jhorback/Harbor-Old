
namespace Harbor.UI.Models.JSPM
{
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