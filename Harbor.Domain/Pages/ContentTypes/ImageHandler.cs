using System;
using System.Collections.Generic;
using System.Security.Principal;
using Harbor.Domain.Pages.PageResources;
using Harbor.Domain.Security;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class ImageHandler : TemplateContentHandler
	{
		private readonly IPrincipal _user;

		public ImageHandler(Page page, TemplateUic uic, IPrincipal user)
			: base(page, uic)
		{
			_user = user;
		}

		public override object GetTemplateContent()
		{
			var image = new Content.Image();

			var fileIdStr = GetProperty("fileID");
			if (string.IsNullOrEmpty(fileIdStr) == false)
				image.FileID = new Guid(fileIdStr);

			image.IsNew = image.FileID == null;
			if (image.IsNew == false)
			{
				var file = Page.GetFile(image.FileID);
				if (file != null)
				{
					image.FileExists = true;
					image.CanDisplay = file.HasPermission(_user.Identity.Name, Permissions.Read);
				}
			}

			image.Res = GetProperty("Res") ?? "low";
			image.Name = GetProperty("Name");
			image.Ext = GetProperty("ext");

			return image;
		}


		public override IEnumerable<PageResource> DeclareResources()
		{
			var image = Page.Template.GetContent<Content.Image>(TemplateUic.Id);
			if (image.FileID == null)
			{
				yield break;
			}

			yield return new FileResource(Page, (Guid)image.FileID);
		}
	}
}
