using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Image : TemplateContentType
	{
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

		public override Type HandlerType
		{
			get { return typeof(ImageHandler); }
		}
	}
}
