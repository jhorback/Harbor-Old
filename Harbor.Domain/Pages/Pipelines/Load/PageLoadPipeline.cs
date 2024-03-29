﻿using Harbor.Domain.Pages.Pipelines.Update;
using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages.Pipelines.Load
{
	/// <summary>
	/// Executed when a single page is loaded.
	/// </summary>
	public class PageLoadPipeline : BasePipeline<Page>
	{
		public PageLoadPipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<SetAllPageRolesLoadHandler>();
			AddHandler<EnsurePageLayoutLoadHandler>();
			AddHandler<PageTypeLoadHandler>();
			AddHandler<TitilePropertiesLoadHandler>();
			AddHandler<TitleBackgroundUrlLoadHandler>();
			AddHandler<ContentLoadHandler>();
			AddHandler<RootPageLoadHandler>();
		}
	}
}
