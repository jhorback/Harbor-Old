
namespace Harbor.Domain.App
{
	public class RootPagesRepository
	{
		private readonly IAppSettingRepository _appSettingRepository;

		public RootPagesRepository(IAppSettingRepository appSettingRepository)
		{
			_appSettingRepository = appSettingRepository;
		}

		public RootPages GetRootPages()
		{
			RootPages pages = null;
			var appSetting = _appSettingRepository.FindByName("RootPages");
			if (appSetting != null)
			{
				pages = JSON.Parse<RootPages>(appSetting.Value);
			}

			return pages ?? (pages = new RootPages());
		}

		public void RemoveRootPage(int id)
		{
			var pages = GetRootPages();
			pages.Pages.Remove(id);
			saveAppSetting(pages);

		}

		public void AddRootPage(int id, string text)
		{
			var pages = GetRootPages();
			pages.Pages.Add(id, text);
			saveAppSetting(pages);
		}

		public void Save()
		{
			_appSettingRepository.Save();
		}

		private void saveAppSetting(RootPages pages)
		{
			var appSetting = _appSettingRepository.FindByName("RootPages", readOnly: false);
			var settingValue = JSON.Stringify(pages);
			if (appSetting == null)
			{
				appSetting = _appSettingRepository.Create(new AppSetting {Name = "RootPages", Value = settingValue});
			}
			else
			{
				if (settingValue != appSetting.Value)
				{
					appSetting.Value = settingValue;
					_appSettingRepository.Update(appSetting);
				}
			}
		}
	}


	public interface IRootPagesRepository
	{
		RootPages GetRootPages();
		void RemoveRootPage(int id);
		void AddRootPage(int id, string text);
		void Save();
	}
}
