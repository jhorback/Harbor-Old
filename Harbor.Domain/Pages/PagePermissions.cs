
using Harbor.Domain.Security;
namespace Harbor.Domain.Pages
{
	/// <summary>
	/// A tuple of PageFeature and Permissions used to define a DocFunctionalRole.
	/// </summary>
	public class PagePermissions : FeaturePermissions<PageFeature>
	{
		/// <summary>
		/// Creates an instance of PagePermissions with the Document (default) DocFunctionalArea.
		/// </summary>
		/// <param name="feature"></param>
		/// <param name="permissions"></param>
		public PagePermissions(Permissions permissions)
			: base(PageFeature.Page, permissions)
		{

		}

		/// <summary>
		/// Creates an instance of DocPermissions.
		/// </summary>
		/// <param name="feature"></param>
		/// <param name="permissions"></param>
		public PagePermissions(PageFeature feature, Permissions permissions)
			: base(feature, permissions)
		{
			
		}
	}
}