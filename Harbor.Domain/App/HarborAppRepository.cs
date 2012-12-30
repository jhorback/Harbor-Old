using Harbor.Domain.Extensions;

namespace Harbor.Domain.App
{
	public class HarborAppRepository : IHarborAppRepository
	{
		IAppSettingRepository appSettings;

		public HarborAppRepository(IAppSettingRepository appSettings)
		{
			this.appSettings = appSettings;
		}

		public HarborApp GetApp()
		{
			var app = new HarborApp();

			var showSignInLink = appSettings.GetSetting("ShowSignInLink").AsBool();
			if (showSignInLink != null)
				app.ShowSignInLink = showSignInLink ?? false;

			var appName = appSettings.GetSetting("ApplicationName").AsString();
			if (appName != null)
				app.ApplicationName = appName;

			app.HomePageID = appSettings.GetSetting("HomePageID").AsInt();

			return app;
		}

		public void SetApp(HarborApp app)
		{
			setSetting("ShowSignInLink", app.ShowSignInLink);
			setSetting("ApplicationName", app.ApplicationName);
			setSetting("HomePageID", app.HomePageID);
		}

		private AppSetting setSetting(string name, object value)
		{
			var settingDO = appSettings.FindByName(name);
			var strvalue = value == null ? null : value.ToString();
			if (settingDO == null)
			{
			    settingDO = appSettings.Create(new AppSetting { Name = name, Value = strvalue });
			}
			else
			{
				settingDO.Value = strvalue;
				settingDO = appSettings.Update(settingDO);
			}
			return settingDO;
		}
	}
}
