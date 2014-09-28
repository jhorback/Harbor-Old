using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(Title))]
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