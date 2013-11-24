using System;
using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Security;

namespace Harbor.Domain.Files
{
	public class FileQuery : RepositoryQuery<File>
	{
		public FileQuery() : this(null)
		{
		}

		public FileQuery(QueryAdjustment<File> startingQuery)
			: base(startingQuery)
		{
			Filter = FileTypeFilter.None;
		}

		public string Name { get; set; }
		public FileTypeFilter Filter { get; set; }
		public string CurrentUserName { get; set; }

		public new IEnumerable<File> Query(IQueryable<File> queryable)
		{
			queryable = base.Query(modifyQuery(queryable));

			var results = queryable.AsEnumerable();
			return results;
		}

		public int TotalCount(IQueryable<File> queryable)
		{
			queryable = modifyQuery(queryable);
			return queryable.Count();
		}

		IQueryable<File> modifyQuery(IQueryable<File> queryable)
		{
			// queryable = queryable.Where(d => d.Enabled == true);

			if (string.IsNullOrEmpty(Name) == false)
				queryable = queryable.Where(p => p.Name.Contains(Name));

			if (string.IsNullOrEmpty(CurrentUserName) == false)
				queryable = queryable.Where((p => p.UserName == CurrentUserName));

			if (Filter == FileTypeFilter.Images)
			{
				queryable = queryable.Where(f => File.BitmapExtensions.Any(e => e == f.Ext));
			}

			return queryable;
		}
	}

	public enum FileTypeFilter
	{
		None,
		Images
	}
}
