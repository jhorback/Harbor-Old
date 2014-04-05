using System.Web;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	public class ProductLinkDto : PageLinkDto
	{
		public int productCount { get; set; }
		public Domain.Products.PayPalButton firstButton { get; set; }

		public static implicit operator ProductLinkDto(ProductLink link)
		{
			var previewImageID = link.PreviewImageID == null ? null : link.PreviewImageID.ToString();
			var previewImageSrc = previewImageID == null ? null : FileUrls.GetUrl(previewImageID, null, null, FileResolution.Low);
			var href = link.Exists ? VirtualPathUtility.ToAbsolute(link.VirtualPath) : null;

			return new ProductLinkDto
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
				hasPreviewImage = link.HasPreviewImage,
				productCount = link.ProductCount,
				firstButton = link.FirstButton
			};
		}
	}
}