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
			get { return typeof(LinksHandler); }
		}
	}

	public class LinksHandler : PageLayoutContentHandler
	{
		public LinksHandler(Page page) : base(page)
		{
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
			var links = Page.Layout.GetAsideAdata<Content.Links>();
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
			return aside;
		}
	}
}
