using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.PageResources;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages.Content
{
	public class PageLink : PageContent
	{
		public PageLink(Page page, string uicid) : base(page, uicid)
		{
			if (IsNew() == false)
			{
				LinkedPage = page.GetPageLink(PageID);
			}
		}

		protected Page LinkedPage { get; set; }

		public bool IsNew()
		{
			return PageID == 0;
		}

		public bool Exists
		{
			get
			{
				return LinkedPage != null;
			}
		}

		public string Title
		{
			get
			{
				return !Exists ? null : LinkedPage.Title;
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
				return !Exists ? null : LinkedPage.PreviewText;
			}
		}

		public Guid? PreviewImageID
		{
			get
			{
				return !Exists ? null : LinkedPage.PreviewImageID;
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
				return !Exists ? null : LinkedPage.VirtualPath;
			}
		}

		public bool CanDisplay(string userName)
		{
			var canDisplay = !IsNew() && Exists && LinkedPage.HasPermission(userName, Permissions.Read);
			return canDisplay;
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
