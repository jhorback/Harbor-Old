using System;
using System.Collections.Generic;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.PageResources;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages.Content
{
	public class Image : PageContent
	{
		public Image(Page page, string uicid)
			: base(page, uicid)
		{
			if (IsNew == false)
			{
				file = page.GetFile(FileID);
			}
		}

		private File file;

		public bool IsNew
		{
			get
			{
				return FileID == null;
			}
		}

		public bool FileExists
		{
			get
			{
				return file != null;
			}
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
				if (FileExists) // may remove after table is created
					return file.Name;
				return GetProperty("name");
			}
		}

		public string Ext
		{
			get
			{
				if (FileExists) // may remove after table is created
					return file.Ext;
				return GetProperty("ext");
			}
		}

		public bool CanDisplay(string userName)
		{
			return !IsNew && FileExists && file.HasPermission(userName, Permissions.Read);
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			if (FileID == null)
			{
				yield break;
			}

			yield return new FileResource(Page, FileID ?? new Guid());
		}
	}
}
