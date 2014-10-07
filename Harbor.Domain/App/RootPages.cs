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
			Pages = new Dictionary<string, int>();
		}

		public Dictionary<string, int> Pages { get; set; }
	}
}
