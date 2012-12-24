﻿using System.Collections.Generic;
using Harbor.Domain.Security;

namespace  Harbor.Domain.Security.Roles
{
	public class PageAuthor : UserFunctionalRole
	{
		public const string KEY = "PageAuthor";
		public override string Key { get { return PageAuthor.KEY; } }
		public override string Name { get { return "Author"; } }
		public override string Description { get { return "Can create and edit pages and upload and manage files."; } }
		public override IEnumerable<FunctionalPermissions<UserFunctionalArea>> FunctionalPermissions
		{
			get
			{
				return new List<UserPermissions>
					{
						new UserPermissions(UserFunctionalArea.Pages, Permissions.All),
						new UserPermissions(UserFunctionalArea.Files, Permissions.All)
					};
			}
		}
	}
}