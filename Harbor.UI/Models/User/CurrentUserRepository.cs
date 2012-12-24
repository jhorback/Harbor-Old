using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Harbor.Domain.App;
using Harbor.Domain.Security;

namespace Harbor.UI.Models.User
{
	public class CurrentUserRepository
	{
		IHarborAppRepository harborApp;
		IUserRepository userRep;

		public CurrentUserRepository(IUserRepository userRep, IHarborAppRepository harborApp)
		{
			this.userRep = userRep;
			this.harborApp = harborApp;
		}

		public CurrentUserDto GetCurrentUserDto(string username)
		{	
			var user = userRep.FindUserByName(username);
			var currentUser = user == null ? new CurrentUserDto() : (CurrentUserDto)user;
			currentUser.showSignInLink = harborApp.GetApp().ShowSignInLink;
			currentUser.isAuthenticated = user == null ? false : true;
			return currentUser;
		}
	}
}