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
			Filter = FileTypeFilter.None;

			ModifyQuery = modifyQuery;
		}
		

		public string Name { get; set; }
		public FileTypeFilter Filter { get; set; }
		public string CurrentUserName { get; set; }

		
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
