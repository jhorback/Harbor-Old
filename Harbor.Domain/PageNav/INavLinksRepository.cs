using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.PageNav
{
	public interface INavLinksRepository : IRepository<NavLinks>
	{
		NavLinks FindById(int id, bool readOnly);
	}
}
