using System.Web;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(ProductLink))]
	public class ProductLinkDto : PageLinkDto
	{
		public int productCount { get; set; }
		public Products.PayPalButtonDto firstButton { get; set; }

		public ProductLinkDto() { }

		public ProductLinkDto(ProductLink pageLink)
		{
			pageID = pageLink.PageID;
			title = pageLink.Title;
			previewText = pageLink.PreviewText;
			previewImageID = pageLink.PreviewImageID == null ? null : pageLink.PreviewImageID.ToString();;
			previewImageSrc = previewImageID == null ? null : FileUrls.GetUrl(previewImageID, null, null, FileResolution.Low);
			tileDisplay = pageLink.TileDisplay;
			tileClassName = pageLink.TileClassName;
			link = pageLink.Exists ? VirtualPathUtility.ToAbsolute(pageLink.VirtualPath) : null;;
			exists = pageLink.Exists;
			hasPreviewImage = pageLink.HasPreviewImage;
			productCount = pageLink.ProductCount;
			firstButton = Products.PayPalButtonDto.FromPayPalButton(pageLink.FirstButton);
		}

		public static ProductLinkDto FromProductLink(ProductLink productLink)
		{
			return new ProductLinkDto(productLink);
		}
	}
}