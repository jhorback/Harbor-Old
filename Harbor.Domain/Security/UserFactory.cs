
namespace Harbor.Domain.Security
{
	public class UserFactory : IFactory<User>
	{
		public User CreateUser(string userName, string password,
			string firstName, string middleName, string lastName, string email, string[] roles)
		{
			var user = new User
				{
					UserName = userName,
					FirstName = firstName,
					LastName = lastName,
					MiddleName = middleName,
					Email = email
				};
			
			user.SetPassword(password);
			user.AllUserRoles = new UserFeatureRoleRepository().GetUserRoles();
			user.SetRoles(roles);
			return user;
		}

		public static User CreateUser()
		{
			var user = new User { AllUserRoles = new UserFeatureRoleRepository().GetUserRoles() };
			return user;
		}
	}
}
