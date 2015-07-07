using Harbor.Domain.App;
using Harbor.Domain.Security;

namespace Harbor.Domain.AppMenu
{
	/// <summary>
	/// a context class to pass to menu item methods
	/// if needed
	/// </summary>
	public class MenuItemContext
	{
		public MenuItemContext(User user, IHarborAppRepository harborAppRepository)
		{
			HarborApp = harborAppRepository.GetApp();
			User = user;
		}

		public HarborApp HarborApp { get; set; }
		public User User { get; set; }
	}
}
