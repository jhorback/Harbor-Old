using Harbor.Domain.Pages;

namespace Harbor.UI.Models.Pages
{
	public class PageLayoutDto
	{
		public int id { get; set; }
		public bool layoutIsCentered { get; set; }
		public bool layoutIsReadable { get; set; }
		public bool layoutHasNoSidebar { get; set; }
		public string headerKey { get; set; }
		public string headerData { get; set; }
		public string asideKey { get; set; }
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
				headerData = layout.HeaderData,
				asideKey = layout.AsideKey,
				asideData = layout.AsideData
			};
		}

		public static PageLayout ToPageLayout(PageLayout pageLayout, PageLayoutDto layoutDto)
		{
			if (layoutDto != null && pageLayout != null)
			{
				pageLayout.HeaderData = layoutDto.headerData;
				pageLayout.AsideData = layoutDto.asideData;
			}
			
			return pageLayout;
		}
	}
}