
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
			user.AllUserRoles = new UserFunctionalRoleRepository().GetUserRoles();
			user.SetRoles(roles);
			return user;
		}
	}
}
