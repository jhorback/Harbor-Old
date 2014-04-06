
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

		/// <summary>
		/// A PageType is required to set the page layout settings.
		/// </summary>
		/// <param name="context"></param>
		public abstract void SetLayout(PageTypeLayoutContext context);

		/// <summary>
		/// A PageType is required to set the initial page template.
		/// </summary>
		/// <param name="context"></param>
		public abstract void SetTemplate(PageTypeTemplateContext context);

		public virtual void OnPageUpdate(Page page)
		{
			
		}

		public virtual void OnPageCreate(Page page)
		{

		}
	}
}
