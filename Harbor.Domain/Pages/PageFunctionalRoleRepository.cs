using System.Collections.Generic;
using Harbor.Domain.Pages.Roles;

namespace Harbor.Domain.Pages
{
	public class PageFunctionalRoleRepository
	{
		public IEnumerable<PageFunctionalRole> GetRoles()
        {
			return new List<PageFunctionalRole>
            {
               new Author()
			};

			// evolution may have other roles such as "Reader"
			// when associating SID with things such as :everyone, :registered, etc.
		 }
	}
}
