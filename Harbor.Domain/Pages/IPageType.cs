namespace Harbor.Domain.Pages
{
	public interface IPageType
	{
		string Key { get; }

		string Name { get; }

		string Description { get; }

		string ContentDescription { get; }

		AddPageTypeFilter AddPageTypeFilter { get; }


		AddContentTypeFilter AddContentTypeFilter { get; }

		/// <summary>
		/// Sets various options used when adding this page type.
		/// </summary>
		/// <param name="context"></param>
		void SetAddPageTypeFilter(AddPageTypeFilterContext context);


		void SetAddContentTypeFilter(AddContentTypeFilterContext context);


		/// <summary>
		/// A PageType is required to set the page layout settings.
		/// This method is called on load and during page creation.
		/// </summary>
		/// <param name="context"></param>
		void SetLayout(PageTypeLayoutContext context);

		/// <summary>
		/// A PageType is required to set the initial page template.
		/// This method is only called during page creation.
		/// </summary>
		/// <param name="context"></param>
		void SetTemplate(PageTypeTemplateContext context);

		/// <summary>
		/// Allows a page type do perform page modifications before the page is updated in the database.
		/// </summary>
		/// <param name="page"></param>
		void OnPageUpdate(Page page);


		/// <summary>
		/// Allows a page type do perform page modifications before the page is saved in the database.
		/// </summary>
		/// <param name="page"></param>
		void OnPageCreate(Page page);
	}
}
