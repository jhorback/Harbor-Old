using System.Collections.Generic;
using Harbor.Domain.Security.Roles;


namespace Harbor.Domain.Security
{
	public class UserFunctionalRoleRepository : IUserFunctionalRoleRepository
	{
		public IEnumerable<UserFunctionalRole> GetUserRoles()
        {
			return new List<UserFunctionalRole>
            {
                new SystemAdministrator(),
				new WebsiteAdministrator(),
				new UserAdministrator(),
				new PageAuthor(),
				new PageAdministrator()
			};
		 }
	}
}
