
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Used to help define a page Template.
	/// </summary>
	public abstract class PageType
	{
		public abstract string Key { get; }

		public abstract string Name { get; }

		public virtual string Description
		{
			get
			{
				return "";
			}
		}

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

		/// <summary>
		/// Allows a page type do perform page modifications before the page is updated in the database.
		/// </summary>
		/// <param name="page"></param>
		public virtual void OnPageUpdate(Page page)
		{
			
		}

		/// <summary>
		/// Allows a page type do perform page modifications before the page is saved in the database.
		/// </summary>
		/// <param name="page"></param>
		public virtual void OnPageCreate(Page page)
		{

		}
	}
}
