using System.Web;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(PageLink))]
	public class PageLinkDto
	{
		public int pageID { get; set; }
		public string title { get; set; }
		public string previewText { get; set; }
		public string previewImageID { get; set; }
		public string previewImageSrc { get; set; }
		public string tileDisplay { get; set; }
		public string tileClassName { get; set; }
		public string link { get; set; }
		public bool hasPreviewImage { get; set; }
		public bool exists { get; set; }
		
		public PageLinkDto() { }

		public PageLinkDto(PageLink pageLink)
		{
			var href = pageLink.Exists ? VirtualPathUtility.ToAbsolute(pageLink.VirtualPath) : null;

			pageID = pageLink.PageID;
			title = pageLink.Title;
			previewText = pageLink.PreviewText;
			previewImageID = pageLink.PreviewImageID == null ? null : pageLink.PreviewImageID.ToString();
			previewImageSrc = previewImageID == null ? null : FileUrls.GetUrl(previewImageID, null, null, FileResolution.Low);
			tileDisplay = pageLink.TileDisplay;
			tileClassName = pageLink.TileDisplay == "wide" ? "tile tile-wide" : "tile";
			link = href;
			exists = pageLink.Exists;
			hasPreviewImage = pageLink.HasPreviewImage;	
		}

		public static PageLinkDto FromPageLink(PageLink link)
		{
			return new PageLinkDto(link);
		}
	}
}