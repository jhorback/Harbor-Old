using System.Collections.Generic;

namespace  Harbor.Domain.Security.Roles
{
	public class WebsiteAdministrator : UserFeatureRole
	{
		public const string KEY = "WebsiteAdmin";
		public override string Key { get { return WebsiteAdministrator.KEY; } }
		public override string Name { get { return "Website Administrator"; } }
		public override string Description { get { return "Can change properties of the website such as navigation, home page, theme."; } }
		public override IEnumerable<FeaturePermissions<UserFeature>> FeaturePermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFeature.SiteSettings, Permissions.All)
					};
			}
		}
	}
}
