using System;
using System.Security.Principal;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class PageLink : TemplateContentType
	{
		public override string Name
		{
			get { return "Page Link"; }
		}

		public override string Description
		{
			get { return "Add a link to another internal page."; }
		}

		public override Type HandlerType
		{
			get { return typeof(PageLinkHandler); }
		}
	}

	public class PageLinkHandler : TemplateContentHandler
	{
		private readonly IPrincipal _user;

		public PageLinkHandler(Page page, TemplateUic uic, IPrincipal user) : base(page, uic)
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

		public override System.Collections.Generic.IEnumerable<PageResource> DeclareResources()
		{
			var link = GetContent<Content.PageLink>();
			if (link.PageID == 0)
			{
				yield break;
			}

			yield return new PageLinkResource(Page, pageID: link.PageID);
		}
	}
}