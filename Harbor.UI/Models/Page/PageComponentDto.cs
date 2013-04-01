using AutoMapper;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageComponentDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<ComponentType, PageComponentDto>();
			Mapper.CreateMap<PageComponentDto, ComponentType>();
		}
	}

	public class PageComponentDto
	{
		public string key { get; set; }
		public string type { get; set; }
		public string name { get; set; }
		public string description { get; set; }

		public static implicit operator PageComponentDto(ComponentType componentType)
		{
			return Mapper.Map<ComponentType, PageComponentDto>(componentType);
		}

		public static implicit operator ComponentType(PageComponentDto component)
		{
			return Mapper.Map<PageComponentDto, ComponentType>(component);
		}
	}
}