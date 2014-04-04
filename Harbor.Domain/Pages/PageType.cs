
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Used to help define a page Template.
	/// </summary>
	public abstract class PageType
	{
		public abstract string Key { get; }

		public abstract string Name { get; }

		public virtual string Description { get { return ""; } }

		public virtual void OnPageUpdate(PageTypeUpdateContext page)
		{
			
		}

		public virtual void OnPageCreate(PageTypeCreationContext page)
		{

		}
	}
}
