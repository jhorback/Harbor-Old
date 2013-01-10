
namespace Harbor.Domain.Security
{
	public interface IUserRepository : IRepository<User>
	{
		User FindUserByName(string userName);

		User FindUserByName(string userName, bool readOnly);

		User FindById(object id, bool readOnly);
	}
}
