using System.Linq;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	/// <summary>
	/// Deletes the layout if the page being deleted is the last one that uses it.va
	/// </summary>
	public class DeleteLayoutDeleteHandler : IPipelineHanlder<Page>
	{
		private readonly IPageLayoutRepository _pageLayoutRepository;

		public DeleteLayoutDeleteHandler(IPageLayoutRepository pageLayoutRepository)
		{
			_pageLayoutRepository = pageLayoutRepository;
		}

		public void Execute(Page page)
		{
			var layoutCount = _pageLayoutRepository.Query().Count(l => l.PageLayoutID == page.PageLayoutID);
			if (layoutCount == 1)
			{
				var layout = _pageLayoutRepository.FindById(page.PageLayoutID);
				_pageLayoutRepository.Delete(layout);
			}
		}
	}
}
