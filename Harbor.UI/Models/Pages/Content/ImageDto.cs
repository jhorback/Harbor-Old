using System;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(Image))]
	public class ImageDto
	{
		public string imgSrc { get; set; }
		public string res { get; set; }
		public string fileID { get; set; }


		public ImageDto()
		{
		}

		public ImageDto(Image image)
		{
			var fileRes = (FileResolution)Enum.Parse(typeof(FileResolution), image.Res, true);
			
			fileID = image.FileID.ToString();
			res = image.Res;
			imgSrc = FileUrls.GetUrl(fileID, image.Name, image.Ext, fileRes);
		}

		public static ImageDto FromImage(Image image)
		{
			return new ImageDto(image);
		}
	}
}