using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain;
using Harbor.Domain.Files;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models;

namespace Harbor.UI.Controllers.Api
{
    public class FilesController : ApiController
    {
		IFileRepository fileRep;

		public FilesController(IFileRepository fileRep)
		{
			this.fileRep = fileRep;
		}

        // GET api/files
		[FilePermit(Permissions.Read)]
        public IEnumerable<FileDto> Get()
        {
			return fileRep.FindAll(f => string.Compare(f.UserName, User.Identity.Name, System.StringComparison.OrdinalIgnoreCase) == 0)
				.OrderByDescending(f => f.Uploaded)
				.Select(f => (FileDto)f);
        }

        // GET api/files/5
		[FilePermit(Permissions.Read)]
        public HttpResponseMessage Get(int id)
        {
			var file = fileRep.FindById(id);
			if (file == null)
				return Request.CreateNotFoundResponse();

			var fileDto = (FileDto)file;
			return Request.CreateOKResponse(fileDto);
        }

        // PUT api/files/5
		[FilePermit(Permissions.Update)]
		public HttpResponseMessage Put(FileDto file)
        {
			var fileDo = fileRep.FindById(file.id);
			if (fileDo == null)
				return Request.CreateNotFoundResponse();

			fileDo = Mapper.Map<FileDto, File>(file, fileDo);

			var errors = DomainObjectValidator.Validate(fileDo);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);

			try
			{
				fileDo = fileRep.Update(fileDo);
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e.Message);
			}

			var fileDto = (FileDto)fileDo;
			return Request.CreateOKResponse(fileDto);
        }

        // DELETE api/files/5
		public HttpResponseMessage Delete(int id)
        {
			var fileDo = fileRep.FindById(id);
			fileRep.Delete(fileDo);
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }

		// jch* - uploading files only via the standard user controller for now
		// POST api/files - accepts multipart form data for upload and: album
		//public Task<HttpResponseMessage> PostFormData()
		//{
		//    // Check if the request contains multipart/form-data.
		//    if (!Request.Content.IsMimeMultipartContent())
		//    {
		//        throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
		//    }

		//    string root = HttpContext.Current.Server.MapPath("~/App_Data/temp");
		//    var provider = new MultipartFormDataStreamProvider(root);

		//    // Read the form data and return an async task.
		//    var task = Request.Content.ReadAsMultipartAsync(provider).
		//        ContinueWith<HttpResponseMessage>(t =>
		//        {
		//            if (t.IsFaulted || t.IsCanceled)
		//            {
		//                return Request.CreateInternalServerErrorResponse(t.Exception);
		//            }

		//            // get the album
		//            string album = "";
		//            foreach (var key in provider.FormData.AllKeys)
		//            {
		//                if (key.ToLower() == "album")
		//                {
		//                    foreach (var val in provider.FormData.GetValues(key))
		//                    {
		//                        album = val;
		//                        break;
		//                    }
		//                }
		//            }

		//            // create the file
		//            File fileToReturn = default(File);
		//            foreach (MultipartFileData file in provider.FileData)
		//            {
		//                //Trace.WriteLine(file.Headers.ContentDisposition.FileName);
		//                //Trace.WriteLine("Server file path: " + file.LocalFileName);
		//                var contentType = file.Headers.ContentType.MediaType;
		//                fileToReturn = fileRep.Create(file.LocalFileName, contentType, album);
		//            }

		//            return Request.CreateResponse(HttpStatusCode.OK, fileToReturn);
		//        });

		//    return task;
		//}
    }
}
