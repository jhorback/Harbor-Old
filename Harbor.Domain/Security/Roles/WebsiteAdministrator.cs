using System.Collections.Generic;

namespace  Harbor.Domain.Security.Roles
{
	public class WebsiteAdministrator : UserFunctionalRole
	{
		public const string KEY = "WebsiteAdmin";
		public override string Key { get { return WebsiteAdministrator.KEY; } }
		public override string Name { get { return "Website Administrator"; } }
		public override string Description { get { return "Can change properties of the website such as navigation, home page, theme."; } }
		public override IEnumerable<FunctionalPermissions<UserFunctionalArea>> FunctionalPermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFunctionalArea.SiteSettings, Permissions.All)
					};
			}
		}
	}
}
