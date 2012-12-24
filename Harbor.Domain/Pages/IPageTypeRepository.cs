using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public interface IPageTypeRepository
	{
		IEnumerable<PageType> GetPageTypes();

		PageType GetPageType(string key);
	}
}
