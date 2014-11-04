using System;
using System.Linq;

namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class LinksHandler : PageLayoutContentHandler
	{
		private readonly ILogger _logger;
		private readonly IPageRepository _pageRepository;

		public LinksHandler(ILogger logger, Page page, IPageRepository pageRepository)
			: base(page)
		{
			_logger = logger;
			_pageRepository = pageRepository;
		}

		public override void OnDelete()
		{
			// if a page being deleted is a link, then remove the link
			RemovePageFromLinks(Page.PageID);
		}

		/// <summary>
		/// Removes any links to the specified page id.
		/// </summary>
		/// <param name="pageId"></param>
		public void RemovePageFromLinks(int pageId)
		{
			if (Page.Layout == null)
			{
				var message = "The page layout is null.";
				_logger.Error(message);
				throw new Exception(message);
			}

			var links = Page.Layout.GetAsideAdata<Content.Links>();
			if (links == null)
			{
				_logger.Debug("The links are null.");
				return;
			}

			foreach (var section in links.sections)
			{
				var linkToDelete = section.links.FirstOrDefault(l => l.pageID == pageId);
				if (linkToDelete != null)
				{
					section.links.Remove(linkToDelete);
				}
			}
			Page.Layout.SetAsideData(links);
		}

		public override object GetLayoutContent()
		{
			var aside = GetAside<Content.Links>() ?? new Content.Links();
			aside.EnsureIds();
			syncPageNames(aside);
			return aside;
		}

		// does a query to sync the page names
		void syncPageNames(Content.Links links)
		{
			var pageIDs = links.sections.SelectMany(s => s.links).Select(l => l.pageID).Distinct().ToArray();
			var pages = _pageRepository.Query().Where(p => pageIDs.Contains(p.PageID)).ToDictionary(p => p.PageID);

			foreach (var section in links.sections)
			{
				foreach (var link in section.links)
				{
					if (pages.ContainsKey(link.pageID))
					{
						link.text = pages[link.pageID].Title;
					}
				}
			}
		}
	}
}
