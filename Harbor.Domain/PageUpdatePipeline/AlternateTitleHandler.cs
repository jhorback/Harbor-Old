using System.Linq;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.PageComponents;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.PageUpdatePipeline
{
	/// <summary>
	/// Update the pages AlternateTitle if the first aside component is a Links component.
	/// Sets it to the links name.
	/// </summary>
	public class AlternateTitleHandler : IPipelineHanlder<Page>
	{
		private readonly IPageComponentRepository _pageComponentRepository;

		public AlternateTitleHandler(IPageComponentRepository pageComponentRepository)
		{
			_pageComponentRepository = pageComponentRepository;
		}

		public void Execute(IPipelineContext<Page> context)
		{
			var page = context.Target;
			if (!page.Template.Aside.Any())
			{
				return;
			}

			var firstAside = page.Template.Aside.First();
			if (firstAside.key == Harbor.Domain.Pages.Components.Links.KEY)
			{
				// maybe add a method to comprepository: GetCoimponent(page, firstAside); instead of above if block
				var links = _pageComponentRepository.GetComponent<Links>(page, firstAside.uicid);
				if (links != null)
				{
					// page.Title = links.Name;
					// page.AlternateTitle = links.Name;
				}
			}
		}
	}
}
