using System;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Links : ContentType
	{
		public override Type HandlerType
		{
			// get { return typeof(AsideHandler<Content.Links>); }
			get { return typeof(TestLinksHandler); }
		}
	}

	public class TestLinksHandler : PageLayoutContentHandler
	{
		public TestLinksHandler(Page page) : base(page)
		{
		}

		public override void OnDelete(Page page)
		{
			// if a page being deleted is a link, then remove the link
			var links = page.Layout.GetAsideAdata<Content.Links>();
			foreach (var section in links.sections)
			{
				var linkToDelete = section.links.FirstOrDefault(l => l.pageID == page.PageID);
				if (linkToDelete != null)
				{
					section.links.Remove(linkToDelete);
				}
			}
			page.Layout.SetAsideData(links);
		}

		public override object GetLayoutContent()
		{
			var aside = GetAside<Content.Links>() ?? new Content.Links();
			aside.EnsureIds();
			return aside;
		}
	}
}
