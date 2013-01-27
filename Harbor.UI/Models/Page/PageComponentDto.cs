using AutoMapper;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageComponentDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<PageComponentType, PageComponentDto>();
			Mapper.CreateMap<PageComponentDto, PageComponentType>();
		}
	}

	public class PageComponentDto
	{
		public string key { get; set; }
		public string type { get; set; }
		public string name { get; set; }
		public string description { get; set; }

		public static implicit operator PageComponentDto(PageComponentType componentType)
		{
			return Mapper.Map<PageComponentType, PageComponentDto>(componentType);
		}

		public static implicit operator PageComponentType(PageComponentDto component)
		{
			return Mapper.Map<PageComponentDto, PageComponentType>(component);
		}
	}
}