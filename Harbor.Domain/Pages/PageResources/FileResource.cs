using System;
using System.Linq;
using Harbor.Domain.Files;

namespace Harbor.Domain.Pages.PageResources
{
	public class FileResource : PageResource
	{
		public FileResource(Page page, Guid fileID) : base(page)
		{
			FileID = fileID;
		}


		public Guid FileID { get; set; }


		public override bool Equals(object obj)
		{
			if (obj == null)
			{
				return false;
			}

			var res = obj as FileResource;
			if (res == null)
			{
				return false;
			}

			return res.FileID == FileID;
		}

		public override int GetHashCode()
		{
			return FileID.GetHashCode();
		}
	}
}
