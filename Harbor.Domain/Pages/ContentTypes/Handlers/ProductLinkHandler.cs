using System.Collections.Generic;
using System.Security.Principal;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class ProductLinkHandler : TemplateContentHandler
	{
		private readonly IPrincipal _user;

		public ProductLinkHandler(Page page, TemplateUic uic, IPrincipal user)
			: base(page, uic)
		{
			_user = user;
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
