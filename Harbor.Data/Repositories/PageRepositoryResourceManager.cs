using System;
using System.Linq;
using Harbor.Domain.Files;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Data.Repositories
{
	public class PageRepositoryResourceManager : IPageRepositoryResourceManager
	{
		private readonly HarborContext context;

		public PageRepositoryResourceManager(HarborContext context)
		{
			this.context = context;
		}

		public void AddResource(Page page, PageResource resource)
		{
			if (resource is FileResource)
			{
				var fileResource = resource as FileResource;
				var file = new File { FileID = fileResource.FileID };
				try
				{
					context.Files.Attach(file);
				}
				catch (InvalidOperationException)
				{
					// file is already attached
				}
				page.Files.Add(file);
			}
		}

		public void RemoveResource(Page page, PageResource resource)
		{
			if (resource is FileResource)
			{
				var fileResource = resource as FileResource;
				var file = page.Files.FirstOrDefault(p => p.FileID == fileResource.FileID);
				context.Files.Remove(file);
			}
		}
	}
}
