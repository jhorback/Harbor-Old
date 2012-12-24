using System.ComponentModel.DataAnnotations;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages
{
	public class PageRole : RoleBase
	{
		public int PageRoleID { get; set; }

		[Required]
		public int PageID { get; set; }

		/// <summary>
		/// The security identifier. Can be a UserName
		/// or a Pseudo SID i.e. :everyone, :registered, group:1234
		/// </summary>
		[Required]
		[StringLength(50)]
		public string SID { get; set; }
	}
}

