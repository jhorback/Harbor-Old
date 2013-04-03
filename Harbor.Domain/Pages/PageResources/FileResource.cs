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

		public override void Add()
		{
			var file = new File { FileID = FileID };
			// context.Files.Attach(file)
			Page.Files.Add(file);
		}

		public override void Remove()
		{
			var file = Page.Files.FirstOrDefault(p => p.FileID == FileID);
			Page.DeletedFiles.Add(file);
		}
	}
}
