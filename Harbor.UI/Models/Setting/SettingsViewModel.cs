using System.Collections.Generic;
using Harbor.Domain.App;

namespace Harbor.UI.Models.Setting
{
	public class SettingsViewModel
	{
		public bool CanViewUsers { get; set; }
		public bool CanUpdateSystemSettings { get; set; }
		public bool CanUpdateSiteSettings { get; set; }

		public PageDto HomePage { get; set; }
		public string Theme { get; set; }
		public IEnumerable<string> Themes { get; set; }
		public List<string> RootPageUrls { get; set; }
	}
}