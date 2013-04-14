using Harbor.Domain.Files;
using Harbor.Domain.Pages.PageComponents;

namespace Harbor.UI.Models.Components
{
	public class PageLinkDto
	{
		public string title { get; set; }
		public string previewText { get; set; }
		public string previewImageID { get; set; }
		public string previewImageSrc { get; set; }

		public static implicit operator PageLinkDto(PageLink link)
		{
			var previewImageID = link.PreviewImageID.ToString();

			return new PageLinkDto
			{
				title = link.Title,
				previewText = link.PreviewText,
				previewImageID = previewImageID,
				previewImageSrc = FileUrls.GetUrl(previewImageID, null, null, FileResolution.Low)
			};
		}
	}
}