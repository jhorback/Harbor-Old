using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages
{
	public interface IPageRepositoryResourceManager
	{
		void AddResource(Page page, PageResource resource);
		void RemoveResource(Page page, PageResource resource);
		IEnumerable<PageResource> GetResourcesFromPage(Page page);
	}
}
