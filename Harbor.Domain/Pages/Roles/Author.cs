using System.Collections.Generic;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages.Roles
{
	public class Author : PageFeatureRole
	{
		public const string KEY = "Author";
		public override string Key { get { return Author.KEY; } }
		public override string Name { get { return "Author"; } }
		public override string Description { get { return "The author of the document."; } }
		public override IEnumerable<FeaturePermissions<PageFeature>> FeaturePermissions
		{
			get
			{
				return new List<PagePermissions>
					{
						new PagePermissions(Permissions.All)
					};
			}
		}
	}
}
