
namespace Harbor.UI.Models.Setting
{
	public interface ISettingsViewModelRepository
	{
		SettingsViewModel GetSettingsViewModel(string currentUserName);
	}
}
