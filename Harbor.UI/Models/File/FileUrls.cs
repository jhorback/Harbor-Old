using System.IO;
using System.Linq;
using Harbor.Domain.Files;
using File = Harbor.Domain.Files.File;

namespace Harbor.UI.Models
{
	public class FileUrls
	{
		public static string GetUrl(File file)
		{
			return string.Format("file/{0}{1}", file.FileID, file.Ext);
		}

		public static string GetLowResUrl(File file)
		{
			return file.ResolutionsCreated.HasFlag(FileResolution.Low)
					? string.Format("file/{0}{1}?res=low", file.FileID, file.Ext)
					: null;
		}

		public static string GetHighResUrl(File file)
		{
			return file.ResolutionsCreated.HasFlag(FileResolution.High)
					? string.Format("file/{0}{1}?res=high", file.FileID, file.Ext)
					: null;
		}

		public static string GetThumbUrl(File file)
		{
			if (file.IsBitmap())
			{
				var url = GetLowResUrl(file);
				return string.IsNullOrEmpty(url) ? GetUrl(file) : url;
			}
			else return getThumbUrl(file.Ext);
		}

		public static string GetThumbUrl(string fileName)
		{
			return getThumbUrl(Path.GetExtension(fileName));
		}

		private static string getThumbUrl(string ext)
		{
			// got icons from: http://www.iconfinder.com/search/?q=iconset%3Ametro-ui-dock-icon-set--icons-by-dakirby
			ext = ext.ToLower();
			var thumb = "file";
			if (new string[] { ".doc", ".docx", ".html" }.Contains(ext))
				thumb = "doc";
			if (new string[] { ".mpeg", ".mpg" }.Contains(ext))
				thumb = "video";
			if (new string[] { ".mp3" }.Contains(ext))
				thumb = "audio";
			return string.Format("content/images/thumbs/{0}.png", thumb);
		}
	}
}