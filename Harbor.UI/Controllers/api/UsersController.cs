using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain;
using Harbor.Domain.Security;
using Harbor.UI.Extensions;
using Harbor.UI.Models.User;

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
		[Http.Permit(UserFeature.Users, Permissions.Read)]
        public IEnumerable<UserDto> Get()
		{
			return userRep.FindAll().Select(u => (UserDto)u);
		}


        // GET api/users/5
		// [Http.Permit(UserFeature.Users, Permissions.Read)]
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
		[Http.Permit(UserFeature.Users, Permissions.Create)]
		public HttpResponseMessage Post(UserDto user)
        {
			var userDo = (Domain.Security.User)user;

			try
			{
				userDo = userRep.Create(userDo);
				userRep.Save();
			}
			catch (DomainValidationException exception)
			{
				return Request.CreateBadRequestResponse(exception);
			}

			return Request.CreateOKResponse((UserDto)userDo);
        }

        // PUT api/users/5
		[Http.Permit(UserFeature.Users, Permissions.Update)]
		public HttpResponseMessage Put(UserDto user)
        {
			var userDo = userRep.FindUserByName(user.userName, readOnly: false);
			if (userDo == null)
				return Request.CreateNotFoundResponse();

			userDo = Mapper.Map(user, userDo);

			try
			{
				userDo = userRep.Update(userDo);
				userRep.Save();
			}
			catch (DomainValidationException e)
			{
				return Request.CreateBadRequestResponse(e);
			}
			
			var userDto = (UserDto)userDo;
			return Request.CreateOKResponse(userDto);
        }

        // DELETE api/users/5
		[Http.Permit(UserFeature.Users, Permissions.Delete)]
		public HttpResponseMessage Delete(string userName)
        {
			var userDo = userRep.FindUserByName(userName);
			userRep.Delete(userDo);
			userRep.Save();
			return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
