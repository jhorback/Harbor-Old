
namespace Harbor.Domain.Pages
{
	public class AddPageTypeFilterContext
	{

		public AddPageTypeFilterContext()
		{
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
			Filter.IsPrimary = isPrimary;
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
			Filter.SuggestedTypes.Add(typeof(T));
			return this;
		}

		/// <summary>
		/// If set, only includes these page types when adding a sub page.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddPageTypeFilterContext IncludePageType<T>() where T : PageType
		{
			Filter.IncludeTypes.Add(typeof(T));
			return this;
		}

		/// <summary>
		/// If set, includes all page types except for these listed.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddPageTypeFilterContext ExcludePageType<T>() where T : PageType
		{
			Filter.ExcludeTypes.Add(typeof(T));
			return this;
		}
	}
}
