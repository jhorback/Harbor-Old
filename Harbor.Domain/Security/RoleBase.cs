using System.ComponentModel.DataAnnotations;

namespace Harbor.Domain.Security
{
	public class RoleBase
	{
		[StringLength(50)]
		public string Role { get; set; }

		public override string ToString()
		{
			return Role;
		}
	}
}

