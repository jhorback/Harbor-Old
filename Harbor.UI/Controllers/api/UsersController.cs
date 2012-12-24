using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain;
using Harbor.Domain.App;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models.User;
using System.Linq;

namespace Harbor.UI.Controllers.Api
{
	[Authorize]
    public class UsersController : ApiController
    {
		IUserRepository userRep;

		public UsersController(IUserRepository userRep)
		{
			this.userRep = userRep;
		}

        // GET api/users
		[Http.Permit(UserFunctionalArea.Users, Permissions.Read)]
        public IEnumerable<UserDto> Get()
		{
			return userRep.FindAll().Select(u => (UserDto)u);
		}


        // GET api/users/5
		// [Http.Permit(UserFunctionalArea.Users, Permissions.Read)]
		[Authorize]
        public HttpResponseMessage Get(string userName)
        {
			var user = userRep.FindUserByName(userName);
			if (user == null)
				return Request.CreateNotFoundResponse();

			var userDto = (UserDto)user;
			return Request.CreateOKResponse(userDto);
        }

        // POST api/users
		[Http.Permit(UserFunctionalArea.Users, Permissions.Create)]
		public HttpResponseMessage Post(UserDto user)
        {
			var userDo = (Domain.Security.User)user;
			var errors = DomainObjectValidator.Validate(userDo);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);
			
			try
			{
				userDo = userRep.Create(userDo);
			}
			catch (DomainValidationException exception)
			{
				return Request.CreateBadRequestResponse(exception.Message);
			}

			return Request.CreateOKResponse((UserDto)userDo);
        }

        // PUT api/users/5
		[Http.Permit(UserFunctionalArea.Users, Permissions.Update)]
		public HttpResponseMessage Put(UserDto user)
        {
			var userDo = userRep.FindUserByName(user.userName);
			if (userDo == null)
				return Request.CreateNotFoundResponse();

			userDo = Mapper.Map<UserDto, Domain.Security.User>(user, userDo);

			var errors = DomainObjectValidator.Validate(userDo);
			if (errors.Count != 0)
				return Request.CreateBadRequestResponse(errors);

			try
			{
				userDo = userRep.Update(userDo);
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e.Message);
			}
			
			var userDto = (UserDto)userDo;
			return Request.CreateOKResponse(userDto);
        }

        // DELETE api/users/5
		[Http.Permit(UserFunctionalArea.Users, Permissions.Delete)]
		public HttpResponseMessage Delete(string userName)
        {
			var userDo = userRep.FindUserByName(userName);
			userRep.Delete(userDo);
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
