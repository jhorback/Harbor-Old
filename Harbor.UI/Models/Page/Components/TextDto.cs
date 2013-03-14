
namespace Harbor.UI.Models.Components
{
	public class TextDto
	{
		private string _text;

		public string text
		{
			get
			{
				if (string.IsNullOrEmpty(_text)) {
					return "[Add Text]";
				}
				return _text;
			}
			set
			{
				_text = value;
			}
		}
	}
}