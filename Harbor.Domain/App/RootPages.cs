using System.Collections.Generic;

namespace Harbor.Domain.App
{
	/// <summary>
	/// 
	/// </summary>
	public class RootPages
	{
		public RootPages()
		{
			Pages = new Dictionary<int, string>();
		}

		public Dictionary<int, string> Pages { get; set; }
	}
}
