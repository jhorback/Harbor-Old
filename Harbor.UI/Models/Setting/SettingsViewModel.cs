using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Harbor.UI.Models.Setting
{
	public class SettingsViewModel
	{
		public bool CanViewUsers { get; set; }
		public bool CanUpdateSystemSettings { get; set; }
		public bool CanUpdateSiteSettings { get; set; }

		public PageDto HomePage { get; set; }
	}
}