using System.Collections.Generic;
using System.Web;

namespace Harbor.Domain.Files
{
	public interface IFileRepository : IRepository<File>
	{
		IEnumerable<File> FindAll(FileQuery query);

		File Create(string userName, HttpPostedFileBase uploadedFile);

		File FindById(object id, bool readOnly);
	}
}
