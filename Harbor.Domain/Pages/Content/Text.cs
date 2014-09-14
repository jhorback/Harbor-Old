
namespace Harbor.Domain.Pages.Content
{
	public class Text
	{
		public Text(string html)
		{
			if (html != null)
			{
				Html = html.Trim();
			}
		}

		public bool HasContent
		{
			get
			{
				return string.IsNullOrEmpty(Html) == false;
			}
		}

		public string Html { get; private set; }
	}
}
