using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Security
{
	public interface IUserFunctionalRoleRepository
	{
		IEnumerable<UserFunctionalRole> GetUserRoles();
	}
}
