using System;
using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	/// <summary>
	/// A base class for filtering types.
	/// </summary>
	public abstract class AddTypeFilter
	{
		protected AddTypeFilter()
		{
			SuggestedTypes = new List<Type>();
			IncludeTypes = new List<Type>();
			ExcludeTypes = new List<Type>();
		}

		/// <summary>
		/// If set, shows this list in order first and any other matching the
		/// include or exclude that are not ruled out.
		/// </summary>
		public List<Type> SuggestedTypes { get; set; }

		/// <summary>
		/// If set, only includes these page types when adding a sub page.
		/// </summary>
		public List<Type> IncludeTypes { get; set; }

		/// <summary>
		/// If set, includes all page types except for these listed.
		/// </summary>
		public List<Type> ExcludeTypes { get; set; }
	}
}
