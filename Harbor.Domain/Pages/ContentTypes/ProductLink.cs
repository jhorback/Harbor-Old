using System;
using System.Collections.Generic;
using System.Security.Principal;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class ProductLink : TemplateContentType
	{
		public override string Name
		{
			get { return "Product Link"; }
		}

		public override string Description
		{
			get { return "Add a link to page that contains a PayPal button."; }
		}

		public override Type HandlerType
		{
			get { return typeof(ProductLinkHandler); }
		}
	}

	public class ProductLinkHandler : TemplateContentHandler
	{
		private readonly IPrincipal _user;

		public ProductLinkHandler(Page page, TemplateUic uic, IPrincipal user) : base(page, uic)
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

			return new Content.ProductLink(pageId, GetProperty("tileDisplay") ?? "normal", linkedPage, _user.Identity.Name);
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
	}
}

