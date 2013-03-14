using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public interface IPageRepository : IRepository<Page>
	{
		IQueryable<Page> Query(IncludePageData include);

		IEnumerable<Page> FindAll(PageQuery pageQuery);

		Page Find(string author, string name);

		Page FindById(int id, bool readOnly);

		bool Exists(string author, string name);
	}

	// jch! move this
	public enum IncludePageData
	{
		Properties = 1,
		Roles = 2,
		PreviewImage = 4,
		Files = 8,
		Products = 16,
		Basic = (Properties | Roles | PreviewImage),
		All = (Properties | Roles | PreviewImage | Files | Products)
	}
}
