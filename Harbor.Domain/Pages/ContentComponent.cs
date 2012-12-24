
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Defines a component that can be added as content of a document.
	/// </summary>
	public abstract class ContentComponent : PageComponent
	{
		public override string Type { get { return "content"; } }
	}
}
