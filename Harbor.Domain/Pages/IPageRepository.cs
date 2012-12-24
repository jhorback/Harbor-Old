
namespace Harbor.Domain.Pages
{
	public interface IPageRepository : IRepository<Page>
	{
		Page Find(string author, string name);

		Page FindById(int id, bool readOnly);

		bool Exists(string author, string name);
	}
}
