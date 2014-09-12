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
			var decs = getUICDeclarations(page);
			var compRes = decs.PageResources;
			
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

			// remove any unused properties
			var propsInUse = decs.PagePropertyNames;
			var propsToDelete = new List<string>();
			foreach (var prop in page.Properties)
			{
				if (propsInUse.All(p => p != prop.Name))
				{
					propsToDelete.Add(prop.Name);
				}
			}

			foreach (var prop in propsToDelete)
			{
				page.DeleteProperty(prop);
			}

			return resourcesUpdated;
		}

		#region private
		UICDeclarations getUICDeclarations(Page page)
		{
			var uicd = new UICDeclarations();
			foreach (var content in page.Template.Content)
			{
				var handler = _contentTypeRepository.GetTemplateContentHandler(content, page);
				if (handler != null)
				{
					uicd.PageResources.AddRange(handler.DeclareResources());
					uicd.PagePropertyNames.AddRange(handler.DeclarePropertyNames());
				}
			}
			return uicd;
		}

		class UICDeclarations
		{

			public List<PageResource> PageResources = new List<PageResource>();
			public List<string> PagePropertyNames = new List<string>();
		}
		#endregion
	}
}
