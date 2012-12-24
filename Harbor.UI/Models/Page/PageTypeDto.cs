using AutoMapper;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageTypeDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<PageType, PageTypeDto>();
			Mapper.CreateMap<PageTypeDto, PageType>();
		}
	}

	public class PageTypeDto
	{
		public string key { get; set; }
		public string name { get; set; }
		public string description { get; set; }

		public static implicit operator PageTypeDto(PageType pageType)
		{
			return Mapper.Map<PageType, PageTypeDto>(pageType);
		}

		public static implicit operator PageType(PageTypeDto pageType)
		{
			return Mapper.Map<PageTypeDto, PageType>(pageType);
		}
	}
}