
namespace Harbor.Domain.Pages
{
	public class AddContentTypeFilterContext
	{
		public AddContentTypeFilterContext()
		{
			Filter = new AddContentTypeFilter();
		}

		public AddContentTypeFilter Filter { get; set; }

		/// <summary>
		/// If set, shows this list in order first and any other matching the
		/// include or exclude that are not ruled out.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddContentTypeFilterContext SuggestContentType<T>() where T : TemplateContentType
		{
			Filter.SuggestedTypes.Add(typeof(T));
			return this;
		}

		/// <summary>
		/// If set, only includes these content types when adding content.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddContentTypeFilterContext IncludeContentType<T>() where T : TemplateContentType
		{
			Filter.IncludeTypes.Add(typeof(T));
			return this;
		}

		/// <summary>
		/// If set, includes all content types except for these listed when adding content.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public AddContentTypeFilterContext ExcludeContentType<T>() where T : TemplateContentType
		{
			Filter.ExcludeTypes.Add(typeof(T));
			return this;
		}
	}
}
