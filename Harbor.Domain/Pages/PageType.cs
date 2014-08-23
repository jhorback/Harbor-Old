
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

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
				var context = new AddPageTypeFilterContext(this);
				SetAddPageTypeFilter(context);
				return context.Filter;
			}
		}

		/// <summary>
		/// Sets various options used when adding this page type.
		/// </summary>
		/// <param name="context"></param>
		public abstract void SetAddPageTypeFilter(AddPageTypeFilterContext context);


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

	public class AddPageTypeFilterContext
	{
		private readonly PageType _pageType;

		public AddPageTypeFilterContext(PageType pageType)
		{
			_pageType = pageType;

			Filter = new AddPageTypeFilter();
		}

		public AddPageTypeFilter Filter { get; set; }

		/// <summary>
		/// Shows up in the first grouping when adding a root page.
		/// </summary>
		/// <param name="isPrimary"></param>
		/// <returns></returns>
		public AddPageTypeFilterContext IsPrimary(bool isPrimary)
		{
			_pageType.AddPageTypeFilter.IsPrimary = isPrimary;
			return this;
		}

		/// <summary>
		/// If set, shows this list in order first and any other matching the
		/// include or exclude that are not ruled out.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddPageTypeFilterContext SuggestPageType<T>() where T : PageType
		{
			Filter.SuggestedPageTypes.Add(typeof(T));
			return this;
		}

		/// <summary>
		/// If set, only includes these page types when adding a sub page.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddPageTypeFilterContext IncludePageType<T>() where T : PageType
		{
			Filter.IncludePageTypes.Add(typeof(T));
			return this;
		}

		/// <summary>
		/// If set, includes all page types except for these listed.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddPageTypeFilterContext ExcludePageType<T>() where T : PageType
		{
			Filter.ExcludePageTypes.Add(typeof(T));
			return this;	
		}
	}

	public class AddPageTypeFilter
	{
		public AddPageTypeFilter()
		{
			IsPrimary = true;
			SuggestedPageTypes = new List<Type>();
			IncludePageTypes = new List<Type>();
			ExcludePageTypes = new List<Type>();
		}

		/// <summary>
		/// Shows up in the first grouping when adding a root page.
		/// </summary>
		public bool IsPrimary { get; set; }

		/// <summary>
		/// If set, shows this list in order first and any other matching the
		/// include or exclude that are not ruled out.
		/// </summary>
		public List<Type> SuggestedPageTypes { get; set; }

		/// <summary>
		/// If set, only includes these page types when adding a sub page.
		/// </summary>
		public List<Type> IncludePageTypes { get; set; }

		/// <summary>
		/// If set, includes all page types except for these listed.
		/// </summary>
		public List<Type> ExcludePageTypes { get; set; }
	}
}
