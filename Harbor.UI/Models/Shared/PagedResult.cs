using System.Collections.Generic;

namespace Harbor.UI.Models
{
	/// <summary>
	/// A dto that contains a paged results with a count of the
	/// total number of records.
	/// </summary>
	/// <typeparam name="T"></typeparam>
	public class PagedResultDto<T>
	{
		public int totalCount { get; set; }
		public IEnumerable<T> results { get; set; }
	}
}