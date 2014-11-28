using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(Title))]
	public class TitleDto
	{
		public TitleDto(Title title)
		{
			displayTitle = title.DisplayTitle;
			parentUrl = title.ParentUrl;
			hasParentUrl = title.HasParentUrl;
			enableTitleBackground = title.EnableTitleBackground;
		}

		public string displayTitle { get; set;}
		public string parentUrl { get; set; }
		public bool hasParentUrl { get; set; }
		public bool enableTitleBackground { get; set; }

		public static TitleDto FromTitle(Title title)
		{
			return new TitleDto(title);
		}
	}
}