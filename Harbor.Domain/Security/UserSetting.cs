using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Harbor.Domain.Security
{
	public class UserSetting : IValueObject
	{
		public int UserSettingID { get; set; }
		
		[Required]
		[StringLength(50)]
		public string UserName { get; set; }
		public virtual User User { get; set; }
		
		[Required]
		[StringLength(50)]
		public string Name { get; set; }
		
		public string Value { get; set; }
	}
}

