using Harbor.Domain;
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
		public object headerData { get; set; }

		public string asideKey { get; set; }
		public UicDto aside { get; set; }
		public object asideData { get; set; }

		public PageLayoutDto() { }

		public PageLayoutDto(PageLayout layout)
		{
			if (layout == null)
			{
				layout = new PageLayout();
			}

			id = layout.PageLayoutID;
			layoutIsCentered = layout.DisplayProperties.HasFlag(PageLayout.LayoutDisplayProperties.ContentCentered);
			layoutIsReadable = layout.DisplayProperties.HasFlag(PageLayout.LayoutDisplayProperties.ContentReadable);
			layoutHasNoSidebar = layout.DisplayProperties.HasFlag(PageLayout.LayoutDisplayProperties.NoAside);
			headerKey = layout.HeaderKey;
			header = UicDto.FromUic(layout.Header);
			headerData = layout.HeaderData;
			asideKey = layout.AsideKey;
			aside = UicDto.FromUic(layout.Aside);
			asideData = layout.AsideData;
		}

		public static PageLayoutDto FromPageLayout(PageLayout layout)
		{
			return new PageLayoutDto(layout);
		}

		public static PageLayout ToPageLayout(PageLayout pageLayout, PageLayoutDto layoutDto)
		{
			if (layoutDto != null && pageLayout != null)
			{
				pageLayout.HeaderDataStr = layoutDto.headerData == null ? null : layoutDto.headerData.ToString();
				pageLayout.AsideDataStr = layoutDto.asideData == null ? null : layoutDto.asideData.ToString();
			}
			
			return pageLayout;
		}
	}
}