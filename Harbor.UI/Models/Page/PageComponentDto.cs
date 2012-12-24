using AutoMapper;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PageComponentDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<PageComponent, PageComponentDto>();
			Mapper.CreateMap<PageComponentDto, PageComponent>();
		}
	}

	public class PageComponentDto
	{
		public string key { get; set; }
		public string type { get; set; }
		public string name { get; set; }
		public string description { get; set; }

		public static implicit operator PageComponentDto(PageComponent component)
		{
			return Mapper.Map<PageComponent, PageComponentDto>(component);
		}

		public static implicit operator PageComponent(PageComponentDto component)
		{
			return Mapper.Map<PageComponentDto, PageComponent>(component);
		}
	}
}