using System.Linq;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Delete
{
	/// <summary>
	/// Deletes the layout if the page being deleted is the last one that uses it.va
	/// </summary>
	public class DeleteLayoutDeleteHandler : IPipelineHanlder<Page>
	{
		private readonly IPageRepository _pageRepository;
		private readonly IPageLayoutRepository _pageLayoutRepository;

		public DeleteLayoutDeleteHandler(IPageRepository pageRepository, IPageLayoutRepository pageLayoutRepository)
		{
			_pageRepository = pageRepository;
			_pageLayoutRepository = pageLayoutRepository;
		}

		public void Execute(Page page)
		{
			DeleteLayoutIfLastUsed(page.PageLayoutID ?? 0);
		}

		public void DeleteLayoutIfLastUsed(int pageLayoutId)
		{
			var pagesCount = _pageRepository.Query().Count(p => p.PageLayoutID == pageLayoutId);
			if (pagesCount <= 1)
			{
				var layout = _pageLayoutRepository.FindById(pageLayoutId);
				if (layout != null)
				{
					_pageLayoutRepository.Delete(layout);					
				}
			}
		}
	}
}
