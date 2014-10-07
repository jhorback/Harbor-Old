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
			Pages.Add("artwork", 33);
		}

		public Dictionary<string, int> Pages { get; set; }
	}
}
