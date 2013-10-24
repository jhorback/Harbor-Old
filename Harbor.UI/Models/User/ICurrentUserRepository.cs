
namespace Harbor.UI.Models.User
{
	public interface ICurrentUserRepository
	{
		CurrentUserDto GetCurrentUserDto(string username);
	}
}
