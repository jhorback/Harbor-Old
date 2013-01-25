using System.Collections.Generic;
using Harbor.Domain.Pages.Roles;

namespace Harbor.Domain.Pages
{
	public class PageFeatureRoleRepository
	{
		public IEnumerable<PageFeatureRole> GetRoles()
        {
			return new List<PageFeatureRole>
            {
               new Author()
			};

			// evolution may have other roles such as "Reader"
			// when associating SID with things such as :everyone, :registered, etc.
		 }
	}
}
