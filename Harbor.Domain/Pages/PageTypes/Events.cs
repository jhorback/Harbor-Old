﻿
namespace Harbor.Domain.Pages.PageTypes
{
	public class Events : PageType
	{
		public override string Key
		{
			get { return "events"; }
		}

		public override string Name
		{
			get { return "Events"; }
		}

		public override string Description
		{
			get { return "A listing of events with newest on top."; }
		}

		public override string ContentDescription
		{
			get { return "A list of page links."; }
		}
		

		public override void SetLayout(PageTypeLayoutContext context)
		{
			context
				.SetLayout(PageLayout.LayoutDisplayProperties.ContentCentered | PageLayout.LayoutDisplayProperties.NoAside)
				.SetHeader(LayoutContentTypes.Title);
		}

		public override void SetTemplate(PageTypeTemplateContext context)
		{
			context
				.AddContent(TemplateContentTypes.PageLink, Template.ContentClassNames.Col1)
				.SetDefaultContentClassName(Template.ContentClassNames.Col1);
		}

		public override void SetAddPageTypeFilter(AddPageTypeFilterContext context)
		{
			context.IsPrimary(true);
		}

		public override void SetAddContentTypeFilter(AddContentTypeFilterContext context)
		{
			context
				.SuggestContentType<ContentTypes.PageLink>();
		}
	}
}
