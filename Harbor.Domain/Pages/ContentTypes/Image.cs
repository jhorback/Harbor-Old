using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class ImageContentHandler : ContentHandler<Content.Image>
	{

		public override Content.Image GetContent(Page page, Content.Image uic)
		{
			throw new NotImplementedException();
		}
	}

	public abstract class ImageContentType : ContentType<ImageContentHandler, Content.Image>
	{
		
	}

	public class Image : ImageContentType
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

		public override ImageContentHandler ContentHandler
		{
			get { throw new NotImplementedException(); }
		}
	}
}
