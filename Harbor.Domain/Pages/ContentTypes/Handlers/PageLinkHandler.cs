using System.Collections.Generic;
using System.Security.Principal;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class PageLinkHandler : TemplateContentHandler
	{
		private readonly IPrincipal _user;

		public PageLinkHandler(Page page, TemplateUic uic, IPrincipal user)
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

			return new Content.PageLink(pageId, GetProperty("tileDisplay") ?? "normal", linkedPage, _user.Identity.Name);
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			var link = GetContent<Content.PageLink>();
			if (link == null || link.PageID == 0)
			{
				yield break;
			}

			yield return new PageLinkResource(Page, pageID: link.PageID);
		}

		public override IEnumerable<string> DeclarePropertyNames()
		{
			yield return UICPropertyName("pageID");
			yield return UICPropertyName("tileDisplay");
		}

		public override System.Guid? GetPagePreviewImageID()
		{
			var link = GetContent<Content.PageLink>();
			return link.PreviewImageID;
		}
<<<<<<< HEAD

		public override string GetPagePreviewText()
		{
			var link = GetContent<Content.PageLink>();
			return link.PreviewText;
		}
=======
>>>>>>> b9f89d018db2f0d6532b57358b10c31c55d9d8af
	}
}
