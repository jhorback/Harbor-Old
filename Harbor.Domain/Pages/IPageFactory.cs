
namespace Harbor.Domain.Pages
{
	public interface IPageFactory : IFactory<Page>
	{
		Page Create(int? parentPageID, string userName, string pageTypeKey, string title, bool publish);
	}
}
