using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Security
{
	/// <summary>
	/// Given all roles for the feature and all granted roles on the entity, determines
	/// if permissions exist for the specified feature.
	/// Built to be used by an Entity.HasPermission method.
	/// </summary>
	/// <typeparam name="TFeature"></typeparam>
	internal class PermissionsChecker<TFeature> 
	{
		IEnumerable<FeatureRoleBase<TFeature>> allRoles;
		IEnumerable<RoleBase> grantedRoles;

		/// <summary>
		/// Creates a new <see cref="PermissionsChecker"/>.
		/// </summary>
		/// <param name="allRoles"></param>
		/// <param name="grantedRoles"></param>
		public PermissionsChecker(IEnumerable<FeatureRoleBase<TFeature>> allRoles, IEnumerable<RoleBase> grantedRoles)
		{
			this.allRoles = allRoles;
			this.grantedRoles = grantedRoles;
		}

		/// <summary>
		/// Tests the permissions for the specified feature.
		/// </summary>
		/// <param name="feature"></param>
		/// <param name="permission"></param>
		/// <returns></returns>
		public bool HasPermission(TFeature feature, Permissions permission)
		{
			foreach (var granted in grantedRoles)
			{
				var role = allRoles.Where(r => r.Key == granted.Role).FirstOrDefault();
				if (role == null) continue;
				if (role.HasPermission(feature, permission))
					return true;
			}
			return false;
		}
	}
}

