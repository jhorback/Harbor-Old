using System.Collections.Generic;
using Harbor.Domain.Query;

namespace Harbor.Domain.Pages.PageTypeAdmin.Queries
{
	public interface IPageTypeQuery : ICachedQuery<IEnumerable<PageTypeDto>>
	{

	}

}
