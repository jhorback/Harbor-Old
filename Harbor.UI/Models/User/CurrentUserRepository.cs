using System.Security.Principal;
using Harbor.Domain.App;
using Harbor.Domain.Security;

namespace Harbor.UI.Models.User
{
	public class CurrentUserRepository : ICurrentUserRepository
	{
		readonly IHarborAppRepository harborApp;
		private readonly IPrincipal _user;
		readonly IUserRepository userRep;


		public CurrentUserRepository(
			IPrincipal user,
			IUserRepository userRep,
			IHarborAppRepository harborApp)
		{
			_user = user;
			this.userRep = userRep;
			this.harborApp = harborApp;
		}

		public CurrentUserDto GetCurrentUserDto()
		{
			var user = GetCurrentUser();
			var currentUser = user == null ? new CurrentUserDto() : (CurrentUserDto)user;
			currentUser.showSignInLink = harborApp.GetApp().ShowSignInLink;
			currentUser.isAuthenticated = user != null;
			return currentUser;
		}

		public Domain.Security.User GetCurrentUser()
		{
			var user = userRep.FindUserByName(_user.Identity.Name);
			return user;
		}
	}
}