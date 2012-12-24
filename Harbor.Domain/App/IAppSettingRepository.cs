using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.App
{
	public interface IAppSettingRepository : IRepository<AppSetting>
	{
		/// <summary>
		/// Returns the setting or a default (never returns null).
		/// </summary>
		/// <param name="name"></param>
		/// <returns></returns>
		AppSetting GetSetting(string name);

		/// <summary>
		/// Returns the setting by name, or null.
		/// </summary>
		/// <param name="name"></param>
		/// <returns></returns>
		AppSetting FindByName(string name);
	}
}
