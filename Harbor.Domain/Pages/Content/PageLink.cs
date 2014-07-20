using System;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages.Content
{
	public class PageLink
	{
		private readonly string _userName;

		public PageLink(int pageId, string tileDisplay, Page linkedPage, string userName)
		{
			_userName = userName;
			PageID = pageId;
			TileDisplay = tileDisplay;
			LinkedPage = linkedPage;
		}

		public int PageID { get; private set; }

		public string TileDisplay { get; private set; }

		protected Page LinkedPage { get; set; }

		public bool IsNew
		{
			get
			{
				return PageID == 0;				
			}
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

		public string VirtualPath
		{
			get
			{
				return !Exists ? null : LinkedPage.VirtualPath;
			}
		}

		public bool CanDisplay
		{
			get
			{
				var canDisplay = !IsNew && Exists && LinkedPage.HasPermission(_userName, Permissions.Read);
				return canDisplay;
			}
		}
	}
}
