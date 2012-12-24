
namespace Harbor.Domain.Security
{
	public interface IUserRepository : IRepository<User>
	{
		User FindUserByName(string userName);
	}
}
