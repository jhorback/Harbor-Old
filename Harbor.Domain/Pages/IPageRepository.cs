using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public interface IPageRepository : IRepository<Page>
	{
		IEnumerable<Page> FindAll(PageQuery pageQuery);

		Page Find(string author, string name);

		Page FindById(int id, bool readOnly);

		bool Exists(string author, string name);
	}
}
