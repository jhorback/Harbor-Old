using AutoMapper;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageComponentDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<PageContentType, PageComponentDto>();
			Mapper.CreateMap<PageComponentDto, PageContentType>();
		}
	}

	public class PageComponentDto
	{
		public string key { get; set; }
		public string type { get; set; }
		public string name { get; set; }
		public string description { get; set; }

		public static implicit operator PageComponentDto(PageContentType componentType)
		{
			return Mapper.Map<PageContentType, PageComponentDto>(componentType);
		}

		public static implicit operator PageContentType(PageComponentDto component)
		{
			return Mapper.Map<PageComponentDto, PageContentType>(component);
		}
	}
}