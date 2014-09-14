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
			IsPrimary = true;
			SuggestedPageTypes = new List<Type>();
			IncludePageTypes = new List<Type>();
			ExcludePageTypes = new List<Type>();
		}

		/// <summary>
		/// Shows up in the first grouping when adding a root page.
		/// </summary>
		public bool IsPrimary { get; set; }

		/// <summary>
		/// If set, shows this list in order first and any other matching the
		/// include or exclude that are not ruled out.
		/// </summary>
		public List<Type> SuggestedPageTypes { get; set; }

		/// <summary>
		/// If set, only includes these page types when adding a sub page.
		/// </summary>
		public List<Type> IncludePageTypes { get; set; }

		/// <summary>
		/// If set, includes all page types except for these listed.
		/// </summary>
		public List<Type> ExcludePageTypes { get; set; }
	}
}
