using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Files;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.PageResources;
using Harbor.Domain.Products;

namespace Harbor.Data.Repositories
{
	public class PageRepositoryResourceManager : IPageRepositoryResourceManager
	{
		private readonly HarborContext context;
		private readonly IPayPalButtonRepository _payPalRepo;

		public PageRepositoryResourceManager(HarborContext context, IPayPalButtonRepository payPalRepo)
		{
			this.context = context;
			_payPalRepo = payPalRepo;
		}

		public void AddResource(Page page, PageResource resource)
		{
			if (resource is FileResource)
			{
				var fileResource = resource as FileResource;
				var file = context.Files.Find(fileResource.FileID);
				if (file != null) page.Files.Add(file);
			}
			else if (resource is PageLinkResource)
			{
				var res = resource as PageLinkResource;
				var pageLink = context.Pages.Find(res.PageID);
				if (pageLink != null) page.PageLinks.Add(pageLink);
			}
			else if (resource is LinksResource)
			{
				var res = resource as LinksResource;
				var pageRes = context.NavLinks.Find(res.NavLinksID);
				if (page != null) page.NavLinks.Add(pageRes);
			}
			else if (resource is PayPalButtonResource)
			{
				var res = resource as PayPalButtonResource;
				var pageRes = context.PayPalButtons.Find(res.PayPalButtonID);
				if (page != null) page.PayPalButtons.Add(pageRes);
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
			else if (resource is PayPalButtonResource)
			{
				var res = resource as PayPalButtonResource;
				var pageRes = page.GetPayPalButton(res.PayPalButtonID);
				page.PayPalButtons.Remove(pageRes);
				// remove the PayPalButton record entirely since
				// it is not shared at the moment
				_payPalRepo.Delete(pageRes);
			}
		}

		public IEnumerable<PageResource> GetResourcesFromPage(Page page)
		{
			var resources = new List<PageResource>();

			foreach (var file in page.Files)
			{
				resources.Add(new FileResource(page, file.FileID));
			}

			foreach (var res in page.PageLinks)
			{
				resources.Add(new PageLinkResource(page, res.PageID));
			}

			foreach (var res in page.NavLinks)
			{
				resources.Add(new LinksResource(page, res.NavLinksID));
			}

			foreach (var res in page.PayPalButtons)
			{
				resources.Add(new PayPalButtonResource(page, res.PayPalButtonID));
			}
			return resources;
		}
	}
}
