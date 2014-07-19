using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageLayoutDto
	{
		public int id { get; set; }
		public bool layoutIsCentered { get; set; }
		public bool layoutIsReadable { get; set; }
		public bool layoutHasNoSidebar { get; set; }
		
		public string headerKey { get; set; }
		public UicDto header { get; set; }
		public string headerData { get; set; }

		public string asideKey { get; set; }
		public UicDto aside { get; set; }
		public string asideData { get; set; }

		public static PageLayoutDto FromPageLayout(PageLayout layout)
		{
			if (layout == null)
			{
				return null;
			}

			return new PageLayoutDto
			{
				id = layout.PageLayoutID,
				layoutIsCentered = layout.DisplayProperties.HasFlag(PageLayout.LayoutDisplayProperties.ContentCentered),
				layoutIsReadable = layout.DisplayProperties.HasFlag(PageLayout.LayoutDisplayProperties.ContentReadable),
				layoutHasNoSidebar = layout.DisplayProperties.HasFlag(PageLayout.LayoutDisplayProperties.NoAside),
				headerKey = layout.HeaderKey,
				header = UicDto.FromUic(layout.Header),
				headerData = layout.HeaderDataStr,
				asideKey = layout.AsideKey,
				aside = UicDto.FromUic(layout.Aside),
				asideData = layout.AsideDataStr
			};
		}

		public static PageLayout ToPageLayout(PageLayout pageLayout, PageLayoutDto layoutDto)
		{
			if (layoutDto != null && pageLayout != null)
			{
				pageLayout.HeaderDataStr = layoutDto.headerData;
				pageLayout.AsideDataStr = layoutDto.asideData;
			}
			
			return pageLayout;
		}
	}
}