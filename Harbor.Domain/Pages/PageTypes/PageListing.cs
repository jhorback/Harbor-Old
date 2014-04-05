﻿
namespace Harbor.Domain.Pages.PageTypes
{
	public class PageListing : PageType
	{
		public override string Key
		{
			get { return "pageListing"; }
		}

		public override string Name
		{
			get { return "Page Listing"; }
		}

		public override string Description
		{
			get { return "A page with navigation links and tiled content."; }
		}

		public override void OnPageCreate(PageTypeCreationContext context)
		{
			context.SetLayout(LayoutDisplayProperties.None)
				.SetHeader(Components.Title.KEY)
				.SetAside(Components.Links.KEY)
				.AddContent(Components.Text.KEY, new [] {ContentClassNames.Tile})
				.SetDefaultContentClassName(ContentClassNames.Tile);
		}
	}
}