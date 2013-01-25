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
	[Http.Permit(UserFeature.Users, Permissions.Read)]
    public class UserRolesController : ApiController
    {
		IUserFeatureRoleRepository roleRep;

		public UserRolesController(IUserFeatureRoleRepository roleRep)
		{
			this.roleRep = roleRep;
		}

        // GET api/users
		[Http.Permit(UserFeature.Users, Permissions.Read)]
        public IEnumerable<UserRoleDto> Get()
		{
			return roleRep.GetUserRoles().Select(u => (UserRoleDto)u);
		}
    }
}