using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Harbor.Domain.Pages.PageResources
{
	public class FileResource : PageResource
	{
		public FileResource(Page page, Guid fileID) : base(page)
		{
			FileID = fileID;
		}

		public Guid FileID { get; set; }
	}
}
