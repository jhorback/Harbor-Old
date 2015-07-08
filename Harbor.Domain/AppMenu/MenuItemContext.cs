using System.Security.Principal;
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
		private readonly IObjectFactory _objectFactory;

		public MenuItemContext(
			IUserRepository userRepository,
			IPrincipal user,
			IObjectFactory objectFactory)
		{
			_objectFactory = objectFactory;
			User = userRepository.FindUserByName(user.Identity.Name, readOnly: true);
		}

		public User User { get; set; }

		public T GetDependency<T>()
		{
			return _objectFactory.GetInstance<T>();
		}
	}
}
