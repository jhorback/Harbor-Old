using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Security;

namespace Harbor.Domain.Files
{
	public class FileQuery : RepositoryQuery<File>
	{
		public FileQuery()
		{
		}

		public FileQuery(QueryAdjustment<File> startingQuery)
			: base(startingQuery)
		{
		}

		public string Name { get; set; }
		public string CurrentUserName { get; set; }

		public new IEnumerable<File> Query(IQueryable<File> queryable)
		{
			queryable = base.Query(queryable);

			// queryable = queryable.Where(d => d.Enabled == true);

			if (string.IsNullOrEmpty(Name) == false)
				queryable = queryable.Where(p => p.Name.Contains(Name));

			if (string.IsNullOrEmpty(CurrentUserName) == false)
				queryable = queryable.Where((p => p.UserName == CurrentUserName));
			
			var results = queryable.ToList();
			return results;
		}
	}
}
