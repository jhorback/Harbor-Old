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
				_page = page.GetPageLink(PageID);
			}
		}

		private Page _page;

		public bool IsNew()
		{
			return PageID == 0;
		}

		public string Title
		{
			get
			{
				return _page == null ? null : _page.Title;
			}
		}
		
		public int PageID
		{
			get
			{
				var id = GetProperty("pageID");
				return id == null ? 0 : int.Parse(id);
			}
		}

		public string PreviewText
		{
			get
			{
				return _page == null ? null : _page.PreviewText;
			}
		}

		public Guid? PreviewImageID
		{
			get
			{
				return _page == null ? null : _page.PreviewImageID;
			}
		}

		public bool HasPreviewImage
		{
			get
			{
				return PreviewImageID != null;
			}
		}

		public string TileDisplay
		{
			get 
			{
				var display = GetProperty("tileDisplay");
				return display ?? "normal";
			}
		}

		public string VirtualPath
		{
			get
			{
				return _page == null ? null : _page.VirtualPath;
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
