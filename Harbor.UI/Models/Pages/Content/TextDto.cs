using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	public class TextDto
	{
		private string _text;

		public string text
		{
			get
			{
				if (string.IsNullOrEmpty(_text)) {
					return "Edit this page to add text.";
				}
				return _text;
			}
			set
			{
				_text = value;
			}
		}

		public TextDto()
		{
		}

		public TextDto(Text text)
		{
			_text = text.Html;
		}

		public static TextDto FromText(Text text)
		{
			return new TextDto(text);
		}
	}
}