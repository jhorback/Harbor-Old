
namespace Harbor.Domain.Pages
{
	public interface IPageFactory : IFactory<Page>
	{
		Page Create(string userName, string pageTypeKey, string title, bool publish);
		Page Create(string userName, string pageTypeKey, string title, bool publish, int pageLayoutId);
	}
}
