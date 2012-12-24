using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Security
{
	/// <summary>
	/// Represents a role associated with a specified functional area.
	/// </summary>
	/// <typeparam name="TFunctionalArea"></typeparam>
	public abstract class FunctionalRoleBase<TFunctionalArea>
	{
		public abstract string Key { get; }
		public abstract string Name { get; }
		public abstract string Description { get; }
		public abstract IEnumerable<FunctionalPermissions<TFunctionalArea>> FunctionalPermissions { get; }

		/// <summary>
		/// Returns true if the specified permissions have been granted.
		/// </summary>
		/// <param name="functionalArea"></param>
		/// <param name="permission"></param>
		/// <returns></returns>
		public bool HasPermission(TFunctionalArea functionalArea, Permissions permission)
		{
			return FunctionalPermissions
				.Where(p => p.FunctionalArea.Equals(functionalArea))
				.Any(p => p.Permissions.IsGranted(permission));
		}
	}
}
