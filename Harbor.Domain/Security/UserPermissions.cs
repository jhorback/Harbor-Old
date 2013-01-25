
namespace Harbor.Domain.Security
{
	/// <summary>
	/// A tuple of UserFeature and Permissions used to define a UserRole.
	/// </summary>
	public class UserPermissions : FeaturePermissions<UserFeature>
	{
		/// <summary>
		/// Creates an instance of UserPermissions.
		/// </summary>
		/// <param name="feature"></param>
		/// <param name="permissions"></param>
		public UserPermissions(UserFeature feature, Permissions permissions)
			: base(feature, permissions)
        {
           
        }
	}
}
