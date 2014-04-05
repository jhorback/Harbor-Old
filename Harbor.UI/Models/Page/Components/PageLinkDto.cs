using System.Web;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Components
{
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
			
		public static implicit operator PageLinkDto(PageLink link)
		{
			var previewImageID = link.PreviewImageID == null ? null : link.PreviewImageID.ToString();
			var previewImageSrc = previewImageID == null ? null : FileUrls.GetUrl(previewImageID, null, null, FileResolution.Low);
			var href = link.Exists ? VirtualPathUtility.ToAbsolute(link.VirtualPath) : null;

			return new PageLinkDto
			{
				pageID = link.PageID,
				title = link.Title,
				previewText = link.PreviewText,
				previewImageID = previewImageID,
				previewImageSrc = previewImageSrc,
				tileDisplay = link.TileDisplay,
				tileClassName = link.TileDisplay == "wide" ? "tile tile-wide" : "tile",
				link = href,
				exists = link.Exists,
				hasPreviewImage = link.HasPreviewImage
			};
		}
	}
}