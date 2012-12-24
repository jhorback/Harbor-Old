using System.Web;

namespace Harbor.Domain.Files
{
	public interface IFileFactory : IFactory<File>
	{
		File CreateFile(string userName, HttpPostedFileBase uploadedFile);
	}
}
