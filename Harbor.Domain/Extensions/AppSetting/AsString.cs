using System;
using Harbor.Domain.App;

namespace Harbor.Domain.Extensions
{
	public static partial class AppSettingExtension
	{
		public static string AsString(this AppSetting setting)
		{
			return setting.Value;
		}
	}
}
