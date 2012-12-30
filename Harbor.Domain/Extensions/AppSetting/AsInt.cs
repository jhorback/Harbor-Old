using System;
using Harbor.Domain.App;

namespace Harbor.Domain.Extensions
{
	public static partial class AppSettingExtension
	{
		public static int? AsInt(this AppSetting setting)
		{
			if (setting.Value == null)
				return null;

			try
			{
				return Convert.ToInt32(setting.Value);
			}
			catch (Exception)
			{
				return null;
			}
		}
	}
}
