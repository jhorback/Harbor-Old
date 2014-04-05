
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Responsible for instantiating the different types of PageComponent.
	/// Allows for a PageComponent to have custom dependencies.
	/// </summary>
	public interface IPageComponentRepository
	{
		PageContent GetComponent(string key, Page page, string uicid);
		T GetComponent<T>(Page page, string uicid) where T: PageContent;
	}
}
