
namespace Harbor.Domain.Pages
{
	public interface IPageLayoutRepository : IRepository<PageLayout>
	{
		PageLayout FindById(int id, bool readOnly);
	}
}
