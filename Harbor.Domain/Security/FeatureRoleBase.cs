using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Security
{
	/// <summary>
	/// Represents a role associated with a specified feature.
	/// </summary>
	/// <typeparam name="TFeature"></typeparam>
	public abstract class FeatureRoleBase<TFeature>
	{
		public abstract string Key { get; }
		public abstract string Name { get; }
		public abstract string Description { get; }
		public abstract IEnumerable<FeaturePermissions<TFeature>> FeaturePermissions { get; }

		/// <summary>
		/// Returns true if the specified permissions have been granted.
		/// </summary>
		/// <param name="feature"></param>
		/// <param name="permission"></param>
		/// <returns></returns>
		public bool HasPermission(TFeature feature, Permissions permission)
		{
			return FeaturePermissions
				.Where(p => p.Feature.Equals(feature))
				.Any(p => p.Permissions.IsGranted(permission));
		}
	}
}
