using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages
{
	public class PageResourceUpdater : IPageResourceUpdater
	{
		private readonly IPageRepositoryResourceManager _resourceManager;
		private readonly IContentTypeRepository _contentTypeRepository;

		public PageResourceUpdater(
			IPageRepositoryResourceManager resourceManager,
			IContentTypeRepository contentTypeRepository)
		{
			_resourceManager = resourceManager;
			_contentTypeRepository = contentTypeRepository;
		}

		/// <summary>
		/// To be called before updating to add/remove resource relationships according to the components.
		/// </summary>
		/// <returns>True if resources were updated.</returns>
		public bool UpdateResources(Page page)
		{
			var resourcesUpdated = false;
			var pageRes = _resourceManager.GetResourcesFromPage(page);
			var compRes = getComponentResources(page);
			
			// remove non required resources
			foreach (var res in pageRes)
			{
				if (!compRes.Any(r => res.Equals(r)))
				{
					_resourceManager.RemoveResource(page, res);
					resourcesUpdated = true;
				}
			}

			// add required resources
			foreach (var res in compRes)
			{
				if (!pageRes.Any(r => res.Equals(r)))
				{
					_resourceManager.AddResource(page, res);
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
			var handler = _contentTypeRepository.GetTemplateContentHandler(uic, page);
			if (handler != null)
			{
				foreach (var res in handler.DeclareResources())
				{
					yield return res;
				}
			}
		}
		#endregion
	}
}
