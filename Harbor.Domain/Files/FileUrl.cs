
namespace Harbor.Domain.Files
{
	public class FileUrl : IFileUrl
	{
		private readonly IPathUtility _pathUtility;

		public FileUrl(IPathUtility pathUtility)
		{
			_pathUtility = pathUtility;
		}

		public string GetUrl(string fileID, string name, string ext, FileResolution? res = null, int? max = null)
		{
			string query = "";
			if (max != null)
			{
				query = "?max=" + max;
			}
			else if (res != null)
			{
				if (res == FileResolution.Low)
					query = "?res=low";
				else if (res == FileResolution.High)
					query = "?res=high";
			}

			if (name == null) name = "file";

			if (ext == null) ext = ".ext";

			return _pathUtility.ToAbsolute(string.Format("~/file/{0}/{1}{2}{3}", fileID, name, ext.ToLower(), query));
		}

		public string GetUrl(File file)
		{
			return GetUrl(file.FileID.ToString(), file.Name, file.Ext);
		}

		public string GetUrl(File file, FileResolution res)
		{
			return GetUrl(file.FileID.ToString(), file.Name, file.Ext);
		}

		public string GetLowResUrl(File file)
		{
			return file.ResolutionsCreated.HasFlag(FileResolution.Low)
				? GetUrl(file.FileID.ToString(), file.Name, file.Ext, res: FileResolution.Low)
					: null;
		}

		public string GetHighResUrl(File file)
		{
			return file.ResolutionsCreated.HasFlag(FileResolution.High)
					? GetUrl(file.FileID.ToString(), file.Name, file.Ext, res: FileResolution.High)
					: null;
		}
	}
}
