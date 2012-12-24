using System.Collections.Generic;

namespace  Harbor.Domain.Security.Roles
{
	public class PageAdministrator : UserFunctionalRole
	{
		public const string KEY = "PageAdmin";
		public override string Key { get { return PageAdministrator.KEY; } }
		public override string Name { get { return "Page Administrator"; } }
		public override string Description { get { return "Add, edit, update, delete page templates."; } }
		public override IEnumerable<FunctionalPermissions<UserFunctionalArea>> FunctionalPermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFunctionalArea.PageTemplates, Permissions.All)
					};
			}
		}
	}
}