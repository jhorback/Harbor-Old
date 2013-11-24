using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public interface IPageRepository : IRepository<Page>
	{
		IQueryable<Page> Query(IncludePageResources include);

		IEnumerable<Page> FindAll(PageQuery pageQuery);
		int FindAllCount(PageQuery pageQuery);

		Page Find(string author, string name);

		Page FindById(int id, bool readOnly);

		bool Exists(string author, string name);
	}
}
