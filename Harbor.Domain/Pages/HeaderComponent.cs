
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Defines a component that can be added to the header of a document.
	/// </summary>
	public abstract class HeaderComponent : ComponentType
	{
		public override string Type { get { return "header"; } }
	}
}
