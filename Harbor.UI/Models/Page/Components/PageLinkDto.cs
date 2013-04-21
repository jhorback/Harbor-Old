using System.Web;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.PageComponents;

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

		public static implicit operator PageLinkDto(PageLink link)
		{
			var previewImageID = link.PreviewImageID.ToString();

			return new PageLinkDto
			{
				pageID = link.PageID,
				title = link.Title,
				previewText = link.PreviewText,
				previewImageID = previewImageID,
				previewImageSrc = FileUrls.GetUrl(previewImageID, null, null, FileResolution.Low),
				tileDisplay = link.TileDisplay,
				tileClassName = link.TileDisplay == "wide" ? "tile tile-wide" : "tile",
				link = VirtualPathUtility.ToAbsolute(link.VirtualPath)
			};
		}
	}
}