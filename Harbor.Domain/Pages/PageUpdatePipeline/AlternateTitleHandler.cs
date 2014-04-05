using System.Linq;
using Harbor.Domain.Pages.PageComponents;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// Update the pages AlternateTitle if the first aside component is a Links component.
	/// Sets it to the links name.
	/// jch* -
	/// If/when implementing a tabbed document, the alt title logic should be:
	/// tabbed document name first, then first nav links name next.
	/// </summary>
	public class AlternateTitleHandler : IPipelineHanlder<Page>
	{
		private readonly IPageComponentRepository _pageComponentRepository;

		public AlternateTitleHandler(IPageComponentRepository pageComponentRepository)
		{
			_pageComponentRepository = pageComponentRepository;
		}

		public void Execute(Page page)
		{
			var aside = page.Template.Aside.FirstOrDefault();
			
			if (firstAside != null && firstAside.key == Pages.Components.Links.KEY)
			{
				var links = _pageComponentRepository.GetComponent<Links>(page, firstAside.uicid);
				if (links != null)
				{
					page.AlternateTitle = links.Name;
				}
			}
		}
	}
}
