using System.Net;
using System.Web.Mvc;
using Harbor.Domain;
using Harbor.Domain.Files;
using Harbor.Domain.Security;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers
{
	[RoutePrefix("file")]
    public class FileController : Controller
    {
		readonly IFileRepository _fileRepository;
	    readonly ILogger _logger;

		public FileController(
			IFileRepository fileRepository,
			ILogger logger
			)
		{
			_fileRepository = fileRepository;
			_logger = logger;
		}
		

		[Permit(UserFeature.Files, Permissions.Create), Route("upload")]
		public JsonResult Upload()
		{
			// to truly handle multiple files need to return an array
			// if  more than one file
			Harbor.Domain.Files.File returnFile = null;
			foreach (string file in Request.Files)
			{
				returnFile = _fileRepository.Create(User.Identity.Name, Request.Files[file]);
			}

			_fileRepository.Save();

			var fileDto = (FileDto)returnFile;
			return new JsonResult { Data = fileDto };
			//return Request.CreateOKResponse(fileDto);
			//return new HttpStatusCodeResult(HttpStatusCode.OK);
		}


		// will have ext and perhaps name as well
		[FilePermit(Permissions.Read), Route("{id}.{ext}"), Route("{id}/{name}.{ext}")]
		public ActionResult Download(string id, FileResolution res = FileResolution.Original, int? max = null, string name = null)
		{
			var file = _fileRepository.FindById(id);
			if (file == null)
			{
				_logger.Info("Download: File does not exist in the database. ID: {0}", id);
				return new HttpStatusCodeResult(HttpStatusCode.NotFound);
			}

			var path = file.GetPhysicalPath(res, max);
			if (System.IO.File.Exists(path) == false)
			{
				_logger.Warn("Download: File exists in database but not on file system. File: {0}", file);
				return new HttpStatusCodeResult(HttpStatusCode.NotFound);				
			}
			return File(path, file.ContentType);
		}

		//public ActionResult Thumbnail(string name)
		//{
		//	var path = FileUrls.GetThumbUrl(name);
		//	return File(path, "image/png");
		//}
    }
}
