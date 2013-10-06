using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages
{
	public class PageResourceUpdater
	{
		readonly IPageComponentRepository componentRepository;
		private readonly IPageRepositoryResourceManager resourceManager;
		readonly Page page;

		public PageResourceUpdater(Page page, IPageComponentRepository componentRepository, IPageRepositoryResourceManager resourceManager)
		{
			this.page = page;
			this.componentRepository = componentRepository;
			this.resourceManager = resourceManager;
		}

		/// <summary>
		/// To be called before updating to add/remove resource relationships according to the components.
		/// </summary>
		/// <returns>True if resources were updated.</returns>
		public bool UpdateResources()
		{
			var resourcesUpdated = false;
			var pageRes = getPageResources();
			var compRes = getComponentResources();
			
			// remove non required resources
			foreach (var res in pageRes)
			{
				if (!compRes.Any(r => res.Equals(r)))
				{
					resourceManager.RemoveResource(this.page, res);
					resourcesUpdated = true;
				}
			}

			// add required resources
			foreach (var res in compRes)
			{
				if (!pageRes.Any(r => res.Equals(r)))
				{
					resourceManager.AddResource(this.page, res);
					resourcesUpdated = true;
				}
			}

			return resourcesUpdated;
		}

		#region private
		IEnumerable<PageResource> getComponentResources()
		{
			foreach (var res in getUICDeclarations(page.Template.Header))
			{
				yield return res;
			}

			foreach (var aside in page.Template.Aside)
			{
				foreach (var res in getUICDeclarations(aside))
				{
					yield return res;
				}
			}

			foreach (var content in page.Template.Content)
			{
				foreach (var res in getUICDeclarations(content))
				{
					yield return res;
				}
			}
		}

		private IEnumerable<PageResource> getUICDeclarations(PageUIC uic)
		{
			var compType = componentRepository.GetPageComponentType(uic.key);
			if (compType != null)
			{
				var comp = page.GetComponent(compType, uic.uicid);
				foreach (var res in comp.DeclareResources())
				{
					yield return res;
				}
			}
		}

		IEnumerable<PageResource> getPageResources()
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
			return resources;
		}
		#endregion
	}
}
