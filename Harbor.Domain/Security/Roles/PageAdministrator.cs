using System.Collections.Generic;

namespace  Harbor.Domain.Security.Roles
{
	public class PageAdministrator : UserFeatureRole
	{
		public const string KEY = "PageAdmin";
		public override string Key { get { return PageAdministrator.KEY; } }
		public override string Name { get { return "Page Administrator"; } }
		public override string Description { get { return "Add, edit, update, delete page templates."; } }
		public override IEnumerable<FeaturePermissions<UserFeature>> FeaturePermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFeature.PageTemplates, Permissions.All)
					};
			}
		}
	}
}