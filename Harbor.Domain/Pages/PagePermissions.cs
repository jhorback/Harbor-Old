
using Harbor.Domain.Security;
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// A tuple of DocFunctionalArea and Permissions used to define a DocFunctionalRole.
	/// </summary>
	public class PagePermissions : FunctionalPermissions<PageFunctionalArea>
	{
		/// <summary>
		/// Creates an instance of DocPermissions with the Document (default) DocFunctionalArea.
		/// </summary>
		/// <param name="functionalArea"></param>
		/// <param name="permissions"></param>
		public PagePermissions(Permissions permissions)
			: base(PageFunctionalArea.Page, permissions)
		{

		}

		/// <summary>
		/// Creates an instance of DocPermissions.
		/// </summary>
		/// <param name="functionalArea"></param>
		/// <param name="permissions"></param>
		public PagePermissions(PageFunctionalArea functionalArea, Permissions permissions)
			: base(functionalArea, permissions)
		{
			
		}
	}
}