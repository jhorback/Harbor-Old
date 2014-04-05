
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Responsible for instantiating the different types of PageContent.
	/// Allows for a PageContent to have custom dependencies.
	/// </summary>
	public interface IPageContentRepository
	{
		PageContent GetContent(string key, Page page, string uicid);
		T GetContent<T>(Page page, string uicid) where T: PageContent;
	}
}
