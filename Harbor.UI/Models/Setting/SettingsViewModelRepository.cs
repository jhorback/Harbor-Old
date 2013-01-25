using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Harbor.Domain.App;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;

namespace Harbor.UI.Models.Setting
{
	public class SettingsViewModelRepository
	{
		IUserRepository userRepository;
		IHarborAppRepository harborAppRepository;
		IPageRepository pageRepository;

		public SettingsViewModelRepository(IUserRepository userRepository, IHarborAppRepository harborAppRepository, IPageRepository pageRepository)
		{
			this.userRepository = userRepository;
			this.harborAppRepository = harborAppRepository;
			this.pageRepository = pageRepository;
		}

		public SettingsViewModel GetSettingsViewModel(string currentUserName)
		{
			var user = userRepository.FindUserByName(currentUserName);
			var model = new SettingsViewModel
			    {
					CanViewUsers = user.HasPermission(UserFeature.Users, Permissions.Read),
					CanUpdateSystemSettings = user.HasPermission(UserFeature.SystemSettings, Permissions.Read),
					CanUpdateSiteSettings = user.HasPermission(UserFeature.SiteSettings, Permissions.Read)
			    };

			var homePageID = harborAppRepository.GetApp().HomePageID;
			if (homePageID != null)
			{
				model.HomePage = pageRepository.FindById(homePageID);
			}
			return model;
		}
	}
}