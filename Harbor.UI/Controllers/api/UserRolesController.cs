using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Harbor.Domain.Security;
using Harbor.UI.Models.User;

namespace Harbor.UI.Controllers.Api
{
	[Http.Permit(UserFeature.Users, Permissions.Read), RoutePrefix("api/userroles")]
    public class UserRolesController : ApiController
    {
		readonly IUserFeatureRoleRepository _roleRep;

		public UserRolesController(IUserFeatureRoleRepository roleRep)
		{
			_roleRep = roleRep;
		}

        [HttpGet, Route("")]
		[Http.Permit(UserFeature.Users, Permissions.Read)]
        public IEnumerable<UserRoleDto> Get()
		{
			return _roleRep.GetUserRoles().Select(u => (UserRoleDto)u);
		}
    }
}