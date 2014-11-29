using System.Collections.Generic;
using System.Linq;
using System.Web;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.Content;
using Harbor.Domain.Pages.PageTypes;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(ProductLink))]
	public class ProductLinkDto : PageLinkDto
	{
		public int productCount { get; set; }
		public List<Products.PayPalButtonDto> buttons { get; set; }

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
			buttons = pageLink.Buttons.Select(Products.PayPalButtonDto.FromPayPalButton).ToList();
		}

		public static ProductLinkDto FromProductLink(ProductLink productLink)
		{
			return new ProductLinkDto(productLink);
		}
	}
}