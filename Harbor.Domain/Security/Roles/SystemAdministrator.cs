using System.Collections.Generic;

namespace  Harbor.Domain.Security.Roles
{
	public class SystemAdministrator : UserFeatureRole
	{
		public const string KEY = "SysAdmin";
		public override string Key { get { return SystemAdministrator.KEY; } }
		public override string Name { get { return "System Administrator"; } }
		public override string Description { get { return "System setup."; } }
		public override IEnumerable<FeaturePermissions<UserFeature>> FeaturePermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFeature.SystemSettings, Permissions.All)
					};
			}
		}
	}
}
