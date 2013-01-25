using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages
{
	public class PageQuery : RepositoryQuery<Page>
	{
		public PageQuery()
		{
		}

		public PageQuery(QueryAdjustment<Page> startingQuery)
			: base(startingQuery)
		{
		}

		public string Title { get; set; }
		public string Author { get; set; }
		public string CurrentUserName { get; set; }

		public new IEnumerable<Page> Query(IQueryable<Page> queryable)
		{
			queryable = base.Query(queryable);

			queryable = queryable.Where(d => d.Enabled == true);

			if (string.IsNullOrEmpty(Title) == false)
				queryable = queryable.Where(p => p.Title.Contains(Title));

			if (string.IsNullOrEmpty(Author) == false)
				queryable = queryable.Where((p => p.AuthorsUserName == Author));
			
			var results = queryable.ToList();
			return results.Where(p => p.HasPermission(CurrentUserName,
				PageFeature.Page, Permissions.Read));
		}
	}
}
