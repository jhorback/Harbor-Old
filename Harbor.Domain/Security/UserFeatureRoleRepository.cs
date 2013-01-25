using System.Collections.Generic;
using Harbor.Domain.Security.Roles;


namespace Harbor.Domain.Security
{
	public class UserFeatureRoleRepository : IUserFeatureRoleRepository
	{
		public IEnumerable<UserFeatureRole> GetUserRoles()
        {
			return new List<UserFeatureRole>
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
