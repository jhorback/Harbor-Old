using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Text : TemplateContentType
	{
		public const string KEY = "text";

		public override string Key
		{
			get { return KEY; }
		}

		public override string Name
		{
			get
			{
				return "Text";
			}
		}

		public override string Description
		{
			get
			{
				return "A rich text editor.";
			}
		}

		public override Type PageComponent
		{
			get
			{
				return typeof(Content.Text);
			}
		}
	}
}
