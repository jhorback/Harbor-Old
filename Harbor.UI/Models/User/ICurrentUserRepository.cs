
namespace Harbor.UI.Models.User
{
	public interface ICurrentUserRepository
	{
		CurrentUserDto GetCurrentUserDto();
		Domain.Security.User GetCurrentUser();
	}
}
