using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages
{
	public class PageQuery : RepositoryQuery<Page>
	{
		public string Title { get; set; }
		public string Author { get; set; }
		public string CurrentUserName { get; set; }

		public new IEnumerable<Page> Query(IQueryable<Page> queryable)
		{
			queryable = base.Query(queryable);

			if (string.IsNullOrEmpty(CurrentUserName) == true)
				throw new InvalidOperationException("The CurrentUserName is required for page queries.");

			queryable = queryable.Where(d => d.Enabled == true);

			if (string.IsNullOrEmpty(Title) == false)
				queryable = queryable.Where(p => p.Title.Contains(Title));

			if (string.IsNullOrEmpty(Author) == false)
				queryable = queryable.Where((p => p.AuthorsUserName == Author));
			
			var results = queryable.ToList();
			return results.Where(p => p.HasPermission(CurrentUserName,
				PageFunctionalArea.Page, Permissions.Read));
		}
	}
}
