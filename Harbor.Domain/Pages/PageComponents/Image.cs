using System;
using Harbor.Domain.Files;

namespace Harbor.Domain.Pages.PageComponents
{
	public class Image : PageComponent
	{
		public Image(Page page, string uicid) : base(page, uicid)
		{
			if (IsNew() == false)
			{
				file = page.GetFile(FileID);
			}
		}

		private File file;

		public bool IsNew()
		{
			return FileID == null ? true : false;
		}
		
		public Guid? FileID
		{
			get
			{
				var id = GetProperty("fileID");
				if (string.IsNullOrEmpty(id))
					return null;
				return new Guid(id);
			}
		}

		public string Res
		{
			get
			{
				var res = GetProperty("Res");
				return string.IsNullOrEmpty(res) ? "low" : res;
			}
		}

		public string Name
		{
			get
			{
				if (file != null) // may remove after table is created
					return file.Name;
				return GetProperty("name");
			}
		}

		public string Ext
		{
			get
			{
				if (file != null) // may remove after table is created
					return file.Ext;
				else return GetProperty("ext");
			}
		}


		public override bool RequiresResource(object resource)
		{
			var file = resource as File;
			return (file != null && file.FileID == FileID);
		}
	}
}
