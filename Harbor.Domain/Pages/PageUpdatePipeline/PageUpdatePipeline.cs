﻿using Harbor.Domain.Pipeline;

namespace Harbor.Domain.Pages
{
	public class PageUpdatePipeline : BasePipeline<Page>
	{
		public PageUpdatePipeline(IObjectFactory objectFactory)
			: base(objectFactory)
		{
			AddHandler<AlternateTitleHandler>();
			AddHandler<PageTypeUpdateHandler>();
			AddHandler<ContentResourceUpdater>();
		}
	}
}
