using System.Collections.Generic;
using System.Security.Principal;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class ProductLinkHandler : TemplateContentHandler
	{
		private readonly IPrincipal _user;
		private readonly IPageRepository _pageRepository;
		private readonly ILogger _logger;

		public ProductLinkHandler(Page page, TemplateUic uic, IPrincipal user, IPageRepository pageRepository, ILogger logger)
			: base(page, uic)
		{
			_user = user;
			_pageRepository = pageRepository;
			_logger = logger;
		}

		public override object GetTemplateContent()
		{
			int pageId;
			Page linkedPage = null;

			var validPageId = int.TryParse(GetProperty("pageID"), out pageId);
			if (!validPageId) pageId = 0;
			else
			{
				linkedPage = Page.GetPageLink(pageId);
			}

			if (validPageId && (linkedPage == null || linkedPage.PayPalButtons.Count == 0))
			{
				linkedPage = _pageRepository.FindById(pageId);
				_logger.Warn("Product link did not load buttons.");
			}

			var content = new Content.ProductLink(pageId, GetProperty("tileDisplay") ?? "normal", linkedPage, _user.Identity.Name);
			return content;
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			var link = GetContent<Content.ProductLink>();
			if (link == null || link.PageID == 0)
			{
				yield break;
			}

			yield return new PageLinkResource(Page, pageID: link.PageID);
		}

		public override IEnumerable<string> DeclarePropertyNames()
		{
			yield return UICPropertyName("tileDisplay");
			yield return UICPropertyName("pageID");
		}

		public override System.Guid? GetPagePreviewImageID()
		{
			var link = GetContent<Content.ProductLink>();
			return link.PreviewImageID;
		}

		public override string GetPagePreviewText()
		{
			var link = GetContent<Content.PageLink>();
			return link.PreviewText;
		}
	}
}
