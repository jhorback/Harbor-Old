
using System;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Components
{
	public class ImageDto
	{
		public string imgSrc { get; set; }
		public string res { get; set; }
		public string fileID { get; set; }

		public static implicit operator ImageDto(Image image)
		{
			var fileID = image.FileID.ToString();
			var res = (FileResolution)Enum.Parse(typeof(FileResolution), image.Res, true);

			return new ImageDto
			{
				fileID = fileID,
				imgSrc = FileUrls.GetUrl(fileID, image.Name, image.Ext, res),
				res = image.Res
			};
		}
	}
}