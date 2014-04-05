using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Image : PageContentType
	{
		public const string KEY = "image";

		public override string Key
		{
			get { return KEY; }
		}

		public override string Name
		{
			get
			{
				return "Image";
			}
		}

		public override string Description
		{
			get
			{
				return "A .jpg, .png, .gif, .bmp, or .tiff file.";
			}
		}

		public override Type PageComponent
		{
			get { return typeof(Content.Image); }
		}
	}
}
