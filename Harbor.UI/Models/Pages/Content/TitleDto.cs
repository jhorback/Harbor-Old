using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	public class TitleDto
	{
		public TitleDto(Title title)
		{
			displayTitle = title.DisplayTitle;
		}

		public string displayTitle { get; set;}

		public static TitleDto FromTitle(Title title)
		{
			return new TitleDto(title);
		}
	}
}