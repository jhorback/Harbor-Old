using System;

namespace Harbor.Domain.Pages.Components
{
	public class Image : ContentComponent
	{
		public const string KEY = "image";

		public override string Key
		{
			get { return Image.KEY; }
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
			get { return typeof(PageComponents.Image); }
		}
	}
}
