using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Security
{
	/// <summary>
	/// Given all roles for the functional area and all granted roles on the entity, determines
	/// if permissions exist for the specified functional area.
	/// Built to be used by an Entity.HasPermission method.
	/// </summary>
	/// <typeparam name="TFunctionalArea"></typeparam>
	internal class PermissionsChecker<TFunctionalArea> 
	{
		IEnumerable<FunctionalRoleBase<TFunctionalArea>> allRoles;
		IEnumerable<RoleBase> grantedRoles;

		/// <summary>
		/// Creates a new <see cref="PermissionsChecker"/>.
		/// </summary>
		/// <param name="allRoles"></param>
		/// <param name="grantedRoles"></param>
		public PermissionsChecker(IEnumerable<FunctionalRoleBase<TFunctionalArea>> allRoles, IEnumerable<RoleBase> grantedRoles)
		{
			this.allRoles = allRoles;
			this.grantedRoles = grantedRoles;
		}

		/// <summary>
		/// Tests the permissions for the specified functional area.
		/// </summary>
		/// <param name="functionalArea"></param>
		/// <param name="permission"></param>
		/// <returns></returns>
		public bool HasPermission(TFunctionalArea functionalArea, Permissions permission)
		{
			foreach (var granted in grantedRoles)
			{
				var role = allRoles.Where(r => r.Key == granted.Role).FirstOrDefault();
				if (role == null) continue;
				if (role.HasPermission(functionalArea, permission))
					return true;
			}
			return false;
		}
	}
}

