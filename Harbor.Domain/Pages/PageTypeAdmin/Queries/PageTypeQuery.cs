using System;
using System.Collections.Generic;
using Harbor.Domain.Query;

namespace Harbor.Domain.Pages.PageTypeAdmin.Queries
{
	public interface IPageTypeQuery : ICachedQuery<IEnumerable<PageTypeDto>>
	{
	
	}


	public class PageTypeQuery : CachedQueryBase<IEnumerable<PageTypeDto>>, IPageTypeQuery
	{
		private readonly IPageTypeRepository _pageTypeRepository;

		public PageTypeQuery(IPageTypeRepository pageTypeRepository)
		{
			_pageTypeRepository = pageTypeRepository;
		}

		public override IEnumerable<PageTypeDto> Execute()
		{
			
		}
	}
}
