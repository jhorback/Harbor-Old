using System.Web;

namespace Harbor.Domain.Files
{
	public interface IFileRepository : IRepository<File>
	{
		File Create(string userName, HttpPostedFileBase uploadedFile);

		File FindById(object id, bool readOnly);
	}
}
