
namespace Harbor.Domain.Security
{
	public enum Permissions
	{
		None = 0,
		Create = 1,
		Read = 2,
		Update = 4,
		Delete = 8,
		CreateAndUpdate = (Create | Update),
		All = (Create | Read | Update | Delete)
	}


	/// <summary>
	/// Extensions for dealing with the <see cref="Permissions"/> enumeration.
    /// </summary>
    public static class PermissionsExtensions
    {
        public static bool IsGranted(this Permissions permissions, Permissions requestedPermission)
        {
            return permissions.HasFlag(requestedPermission);
        }

		/// <summary>
		/// Same as IsGranted - semantic difference based on where the flag is to be used.
		/// </summary>
		/// <param name="permissions"></param>
		/// <param name="requestedPermission"></param>
		/// <returns></returns>
		public static bool IsRequesting(this Permissions permissions, Permissions requestedPermission)
		{
			return permissions.HasFlag(requestedPermission);
		}
    }
}

