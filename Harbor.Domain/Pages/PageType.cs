
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Used to help define a page Template.
	/// </summary>
	public abstract class PageType
	{
		public abstract string Key { get; }

		public abstract string Name { get; }

		public abstract string Description { get; }

		public abstract string ContentDescription { get; }

		public AddPageTypeFilter AddPageTypeFilter
		{
			get
			{
				if (addPageTypeFilter == null)
				{
					var context = new AddPageTypeFilterContext(this);
					addPageTypeFilter = context.Filter;
					SetAddPageTypeFilter(context);
				}
				return addPageTypeFilter;
			}
		}

		public AddContentTypeFilter AddContentTypeFilter
		{
			get
			{
				if (addContentTypeFilter == null)
				{
					var context = new AddContentTypeFilterContext(this);
					addContentTypeFilter = context.Filter;
					SetAddContentTypeFilter(context);
				}
				return addContentTypeFilter;
			}
		}

		private AddPageTypeFilter addPageTypeFilter = null;
		private AddContentTypeFilter addContentTypeFilter = null;

		/// <summary>
		/// Sets various options used when adding this page type.
		/// </summary>
		/// <param name="context"></param>
		public abstract void SetAddPageTypeFilter(AddPageTypeFilterContext context);


		public abstract void SetAddContentTypeFilter(AddContentTypeFilterContext context);


		/// <summary>
		/// A PageType is required to set the page layout settings.
		/// This method is called on load and during page creation.
		/// </summary>
		/// <param name="context"></param>
		public abstract void SetLayout(PageTypeLayoutContext context);

		/// <summary>
		/// A PageType is required to set the initial page template.
		/// This method is only called during page creation.
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
