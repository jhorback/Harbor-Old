using System.ComponentModel.DataAnnotations;

namespace Harbor.Domain.Security
{
	public class UserRole : RoleBase
	{
		public int UserRoleID { get; set; }

		[Required]
		[StringLength(50)]
		public string UserName { get; set; }
	}
}

