using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using Harbor.Domain.Security;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		public static bool UserHasPermit(this HtmlHelper helper, UserFeature feature, Permissions permission = Permissions.All)
		{
			var userName = helper.ViewContext.RequestContext.HttpContext.User.Identity.Name;
			var userRepository = DependencyResolver.Current.GetService<IUserRepository>();
			var user = userRepository.FindUserByName(userName);
			return user.HasPermission(feature, permission);
		}
	}
}