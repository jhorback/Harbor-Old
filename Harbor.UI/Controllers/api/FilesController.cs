using System;
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
	[RoutePrefix("api/files")]
    public class FilesController : ApiController
    {
    	readonly IFileRepository fileRep;

		public FilesController(IFileRepository fileRep)
		{
			this.fileRep = fileRep;
		}


		[HttpGet, Route("")]
		public PagedResultDto<FileDto> Get([FromUri]FileQuery query)
        {
			query.CurrentUserName = User.Identity.Name;
			return new PagedResultDto<FileDto>
			{
				results = fileRep.FindAll(query).Select(f => (FileDto)f),
				totalCount = fileRep.FindAllCount(query)
			};
        }


		[HttpGet, Route("{id:guid}")]
		[Http.FilePermit(Permissions.Read)]
        public HttpResponseMessage Get(Guid id)
        {
			var file = fileRep.FindById(id);
			if (file == null)
				return Request.CreateNotFoundResponse();

			var fileDto = (FileDto)file;
			return Request.CreateOKResponse(fileDto);
        }


		[HttpPut, Route("{id}")]
		[Http.FilePermit(Permissions.Update)]
		public HttpResponseMessage Put(FileDto file)
        {
			var fileDo = fileRep.FindById(file.id, readOnly: false);
			if (fileDo == null)
				return Request.CreateNotFoundResponse();

			fileDo = Mapper.Map<FileDto, File>(file, fileDo);

			var errors = DomainObjectValidator.Validate(fileDo);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);

			try
			{
				fileDo = fileRep.Update(fileDo);
				fileRep.Save();
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e.Message);
			}

			var fileDto = (FileDto)fileDo;
			return Request.CreateOKResponse(fileDto);
        }


		[HttpDelete, Route("{id:guid}")]
		[Http.FilePermit(Permissions.Delete)]
		public HttpResponseMessage Delete(Guid id)
        {
			var fileDo = fileRep.FindById(id);
			fileRep.Delete(fileDo);
			fileRep.Save();
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
