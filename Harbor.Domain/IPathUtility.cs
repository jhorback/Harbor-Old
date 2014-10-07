
namespace Harbor.Domain
{
	public interface IPathUtility
	{
		/// <summary>
		/// Converts a virtual path to an absolute path
		/// </summary>
		/// <param name="virtualPath"></param>
		/// <returns></returns>
		string ToAbsolute(string virtualPath);

		/// <summary>
		/// Does a Server.MapPath after converting the virtual path to an absolute path.
		/// </summary>
		/// <param name="virtualPath"></param>
		/// <returns></returns>
		string MapVirtualPath(string virtualPath);
	}
}
