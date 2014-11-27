using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Harbor.Domain.Files;
using File = Harbor.Domain.Files.File;

namespace Harbor.UI.Models
{
	public class FileUrls
	{
		static IFileUrl FileUrl
		{
			get
			{
				return DependencyResolver.Current.GetService<IFileUrl>();
			}
		}

		public static string GetUrl(string fileID, string name, string ext, FileResolution? res = null, int? max = null)
		{
			return FileUrl.GetUrl(fileID, name, ext, res, max);
		}

		public static string GetUrl(File file)
		{
			return GetUrl(file.FileID.ToString(), file.Name, file.Ext);
		}

		public static string GetUrl(File file, FileResolution res)
		{
			return GetUrl(file.FileID.ToString(), file.Name, file.Ext);
		}

		public static string GetLowResUrl(File file)
		{
			return file.ResolutionsCreated.HasFlag(FileResolution.Low)
				? GetUrl(file.FileID.ToString(), file.Name, file.Ext, res: FileResolution.Low)
					: null;
		}

		public static string GetHighResUrl(File file)
		{
			return file.ResolutionsCreated.HasFlag(FileResolution.High)
					? GetUrl(file.FileID.ToString(), file.Name, file.Ext, res: FileResolution.High)
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
			if (new string[] { ".doc", ".docx" }.Contains(ext))
				thumb = "doc";
			if (new string[] { ".xls", ".xlsx" }.Contains(ext))
				thumb = "xls";
			if (new string[] { ".mpeg", ".mpg" }.Contains(ext))
				thumb = "video";
			if (new string[] { ".mp3" }.Contains(ext))
				thumb = "audio";
			if (new string[] { ".js" }.Contains(ext))
				thumb = "js";
			if (new string[] { ".txt" }.Contains(ext))
				thumb = "txt";
			if (new string[] { ".zip" }.Contains(ext))
				thumb = "zip";
			return url.Content(string.Format("~/content/images/thumbs/{0}.png", thumb));
		}

		static UrlHelper url
		{
			get
			{
				var httpContext = new HttpContextWrapper(HttpContext.Current);
				var currentRoute = RouteTable.Routes.GetRouteData(httpContext);
				var requestContext = new RequestContext(httpContext, currentRoute);
				return new UrlHelper(requestContext);
			}
		}
	}
}