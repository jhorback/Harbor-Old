using AutoMapper;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class PagePropertyDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<PageProperty, PagePropertyDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.PagePropertyID));

			Mapper.CreateMap<PagePropertyDto, PageProperty>()
				.ForMember(dest => dest.PagePropertyID, opt => opt.Ignore());
		}
	}

	public class PagePropertyDto
	{
		public int id { get; set; }
		public string name { get; set; }
		public string value { get; set; }

		public static implicit operator PagePropertyDto(PageProperty property)
		{
			return Mapper.Map<PageProperty, PagePropertyDto>(property);
		}

		public static implicit operator PageProperty(PagePropertyDto property)
		{
			return Mapper.Map<PagePropertyDto, PageProperty>(property);
		}
	}
}