using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageResourceUpdater : IPageResourceUpdater
	{
		readonly IPageContentTypeRepository componentRepository;
		private readonly IPageRepositoryResourceManager resourceManager;
		private readonly IPageContentRepository _pageContentRepository;

		public PageResourceUpdater(
			IPageContentTypeRepository componentRepository,
			IPageRepositoryResourceManager resourceManager,
			IPageContentRepository pageContentRepository)
		{
			this.componentRepository = componentRepository;
			this.resourceManager = resourceManager;
			_pageContentRepository = pageContentRepository;
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
			foreach (var content in page.Template.Content)
			{
				foreach (var res in getUICDeclarations(page, content))
				{
					yield return res;
				}
			}
		}

		private IEnumerable<PageResource> getUICDeclarations(Page page, TemplateUic uic)
		{
			var comp = _pageContentRepository.GetContent(uic.Key, page, uic.Id);
			if (comp != null)
			{
				foreach (var res in comp.DeclareResources())
				{
					yield return res;
				}
			}
		}
		#endregion
	}
}
