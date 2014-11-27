
namespace Harbor.Domain.Files
{
	public interface IFileUrl
	{
		string GetUrl(string fileID, string name, string ext, FileResolution? res = null, int? max = null);
		string GetUrl(File file);
		string GetUrl(File file, FileResolution res);
		string GetLowResUrl(File file);
		string GetHighResUrl(File file);
	}
}
