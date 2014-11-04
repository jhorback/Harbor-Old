using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Harbor.Domain.App;
using Harbor.Domain.Pages;
using Harbor.Domain.Security;
using Harbor.UI.Models.Theming;

namespace Harbor.UI.Models.Setting
{
	public class SettingsViewModelRepository : ISettingsViewModelRepository
	{
		IUserRepository userRepository;
		IHarborAppRepository harborAppRepository;
		IPageRepository pageRepository;
		private readonly IRootPagesRepository _rootPagesRepository;

		public SettingsViewModelRepository(
			IUserRepository userRepository,
			IHarborAppRepository harborAppRepository,
			IPageRepository pageRepository,
			IRootPagesRepository rootPagesRepository
			)
		{
			this.userRepository = userRepository;
			this.harborAppRepository = harborAppRepository;
			this.pageRepository = pageRepository;
			_rootPagesRepository = rootPagesRepository;
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

			var harborApp = harborAppRepository.GetApp();
			var homePageID = harborApp.HomePageID;
			if (homePageID != null)
			{
				model.HomePage = PageDto.FromPage(pageRepository.FindById(homePageID));
			}

			model.Theme = harborApp.Theme;
			model.Themes = ThemeTable.Themes.Select(t => t.Name).ToArray();

			model.RootPageUrls = _rootPagesRepository.GetRootPages().Pages.Select(p => _rootPagesRepository.GetRootPageUrl(p.Key)).ToList();
			return model;
		}
	}
}