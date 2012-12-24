
namespace Harbor.Domain.Security
{
	/// <summary>
	/// A tuple of FunctionalArea and Permissions used to define a UserRole.
	/// </summary>
	public class UserPermissions : FunctionalPermissions<UserFunctionalArea>
	{
		/// <summary>
		/// Creates an instance of UserPermissions.
		/// </summary>
		/// <param name="functionalArea"></param>
		/// <param name="permissions"></param>
		public UserPermissions(UserFunctionalArea functionalArea, Permissions permissions)
			: base(functionalArea, permissions)
        {
           
        }
	}
}
