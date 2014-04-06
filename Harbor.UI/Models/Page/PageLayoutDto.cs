using Harbor.Domain.Pages;

namespace Harbor.UI.Models.Page
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

		public static PageLayout ToPageLayout(PageLayoutDto layout)
		{
			if (layout == null)
			{
				return null;
			}

			var props = PageLayout.LayoutDisplayProperties.None;
			if (layout.layoutHasNoSidebar)
				props = props | PageLayout.LayoutDisplayProperties.NoAside;
			if (layout.layoutIsCentered)
				props = props | PageLayout.LayoutDisplayProperties.ContentCentered;
			if (layout.layoutIsReadable)
				props = props | PageLayout.LayoutDisplayProperties.ContentReadable;

			return new PageLayout
			{
				PageLayoutID = layout.id,
				DisplayProperties = props,
				HeaderKey = layout.headerKey,
				HeaderData = layout.headerData,
				AsideKey = layout.asideKey,
				AsideData = layout.asideData
			};
		}
	}
}