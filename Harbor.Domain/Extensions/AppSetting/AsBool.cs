using System;
using Harbor.Domain.App;

namespace Harbor.Domain.Extensions
{
	public static partial class AppSettingExtension
	{
		public static bool? AsBool(this AppSetting setting)
		{
			if (setting.Value == null)
				return null;

			try
			{
				return Convert.ToBoolean(setting.Value);
			}
			catch (Exception)
			{
				return null;
			}
		}
	}
}
