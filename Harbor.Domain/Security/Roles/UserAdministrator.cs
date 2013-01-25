using System.Collections.Generic;

namespace  Harbor.Domain.Security.Roles
{
	public class UserAdministrator : UserFeatureRole
	{
		public const string KEY = "UserAdmin";
		public override string Key { get { return UserAdministrator.KEY; } }
		public override string Name { get { return "User Administrator"; } }
		public override string Description { get { return "Add, edit, update, delete users."; } }
		public override IEnumerable<FeaturePermissions<UserFeature>> FeaturePermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFeature.Users, Permissions.All)
					};
			}
		}
	}
}