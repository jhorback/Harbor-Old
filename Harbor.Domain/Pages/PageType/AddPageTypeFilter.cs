
namespace Harbor.Domain.Pages
{
	public class AddPageTypeFilter : AddTypeFilter
	{
		public AddPageTypeFilter()
		{
			IsPrimary = true;
		}

		/// <summary>
		/// Shows up in the first grouping when adding a root page.
		/// </summary>
		public bool IsPrimary { get; set; }
	}
}
