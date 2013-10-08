using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageResourceUpdater
	{
		readonly IComponentRepository componentRepository;
		private readonly IPageRepositoryResourceManager resourceManager;

		public PageResourceUpdater(IComponentRepository componentRepository, IPageRepositoryResourceManager resourceManager)
		{
			this.componentRepository = componentRepository;
			this.resourceManager = resourceManager;
		}

		/// <summary>
		/// To be called before updating to add/remove resource relationships according to the components.
		/// </summary>
		/// <returns>True if resources were updated.</returns>
		public bool UpdateResources(Page page)
		{
			var resourcesUpdated = false;
			var pageRes = resourceManager.GetResourcesFromPage(page);
			var compRes = getComponentResources(page);
			
			// remove non required resources
			foreach (var res in pageRes)
			{
				if (!compRes.Any(r => res.Equals(r)))
				{
					resourceManager.RemoveResource(page, res);
					resourcesUpdated = true;
				}
			}

			// add required resources
			foreach (var res in compRes)
			{
				if (!pageRes.Any(r => res.Equals(r)))
				{
					resourceManager.AddResource(page, res);
					resourcesUpdated = true;
				}
			}

			return resourcesUpdated;
		}

		#region private
		IEnumerable<PageResource> getComponentResources(Page page)
		{
			foreach (var res in getUICDeclarations(page, page.Template.Header))
			{
				yield return res;
			}

			foreach (var aside in page.Template.Aside)
			{
				foreach (var res in getUICDeclarations(page, aside))
				{
					yield return res;
				}
			}

			foreach (var content in page.Template.Content)
			{
				foreach (var res in getUICDeclarations(page, content))
				{
					yield return res;
				}
			}
		}

		private IEnumerable<PageResource> getUICDeclarations(Page page, PageUIC uic)
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
		#endregion
	}
}
