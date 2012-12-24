using System;

namespace Harbor.Domain.Pages.Components
{
	public class Text : ContentComponent
	{
		public const string KEY = "text";

		public override string Key
		{
			get { return Text.KEY; }
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
	}
}
