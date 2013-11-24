using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages
{
	public class PageQuery : RepositoryQuery<Page>
	{
		public PageQuery() : this(null)
		{
		}

		public PageQuery(QueryAdjustment<Page> startingQuery)
		{
			StartingQuery = startingQuery;
			ModifyQuery = modifyQuery;
			AfterQuery = afterQuery;
		}

		public string Title { get; set; }
		public string Author { get; set; }
		public string CurrentUserName { get; set; }
		public QueryAdjustment<Page> StartingQuery { get; set; }


		private IQueryable<Page> modifyQuery(IQueryable<Page> queryable)
		{
			if (StartingQuery != null)
				queryable = StartingQuery(queryable);

			queryable = queryable.Where(d => d.Enabled == true);

			if (string.IsNullOrEmpty(Title) == false)
				queryable = queryable.Where(p => p.Title.Contains(Title));

			if (string.IsNullOrEmpty(Author) == false)
				queryable = queryable.Where((p => p.AuthorsUserName == Author));

			return queryable;
		}


		private IQueryable<Page> afterQuery(IQueryable<Page> queryable)
		{
			var results = queryable.ToList();
			return results.Where(p => p.HasPermission(CurrentUserName,
				PageFeature.Page, Permissions.Read)).AsQueryable();
		}
	}
}
