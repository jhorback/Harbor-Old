using System;

namespace Harbor.Domain.Pages.Content
{
	public class Image : PageContent
	{
		public bool IsNew { get; set; }
		public bool FileExists { get; set; }
		public Guid? FileID { get; set; }
		public string Res { get; set; }
		public string Name { get; set; }
		public string Ext { get; set; }
		public bool CanDisplay { get; set; }
	}
}
