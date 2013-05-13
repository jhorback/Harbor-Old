﻿using System;
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
				var file = context.Files.Find(fileResource.FileID);
				page.Files.Add(file);
			}
			else if (resource is PageLinkResource)
			{
				var res = resource as PageLinkResource;
				var pageLink = context.Pages.Find(res.PageID);
				page.PageLinks.Add(pageLink);
			}
			else if (resource is LinksResource)
			{
				var res = resource as LinksResource;
				var pageRes = context.NavLinks.Find(res.NavLinksID);
				page.NavLinks.Add(pageRes);
			}
		}

		public void RemoveResource(Page page, PageResource resource)
		{
			if (resource is FileResource)
			{
				var fileResource = resource as FileResource;
				var file = page.GetFile(fileResource.FileID);
				page.Files.Remove(file);
			}
			else if (resource is PageLinkResource)
			{
				var res = resource as PageLinkResource;
				var pageLink = page.GetPageLink(res.PageID);
				page.PageLinks.Remove(pageLink);
			}
			else if (resource is LinksResource)
			{
				var res = resource as LinksResource;
				var pageRes = page.GetNavLinks(res.NavLinksID);
				page.NavLinks.Remove(pageRes);
			}
		}
	}
}
