using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.PageComponents
{
	public class PageLink : PageComponent
	{
		public PageLink(Page page, string uicid) : base(page, uicid)
		{
			if (IsNew() == false)
			{
				page = page.GetPageLink(PageID);
			}
		}

		private Page page;

		public bool IsNew()
		{
			return PageID == 0;
		}

		public string Title
		{
			get
			{
				return page == null ? null : page.Title;
			}
		}
		
		public int PageID
		{
			get
			{
				var id = GetProperty("pageID");
				return int.Parse(id);
			}
		}

		public string PreviewText
		{
			get
			{
				return page == null ? null : page.PreviewText;
			}
		}

		public Guid? PreviewImageID
		{
			get
			{
				return page == null ? null : page.PreviewImageID;
			}
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			if (PageID == 0)
			{
				yield break;
			}

			yield return new PageLinkResource(Page, pageID: PageID);
		}
	}
}
