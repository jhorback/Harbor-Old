using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Harbor.Domain.App
{
	public class AppSetting : IValueObject, IAggregateRoot
	{
		public int AppSettingID { get; set; }
		
		[Required]
		[StringLength(50)]
		public string Name { get; set; }

		public string Value { get; set; }
	}
}