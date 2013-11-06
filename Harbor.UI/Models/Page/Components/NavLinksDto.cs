using System.Collections.Generic;
using AutoMapper;
using Harbor.Domain.PageNav;
using Harbor.Domain.Pages.PageComponents;

namespace Harbor.UI.Models.Components
{
	public class NavLinksDtoMapper : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<NavLinks, NavLinksDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.NavLinksID))
				.ForMember(dest => dest.sections, opt => opt.MapFrom(src => src.Sections))
				;

			Mapper.CreateMap<Links, NavLinksDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.NavLinksID))
				.ForMember(dest => dest.sections, opt => opt.MapFrom(src => src.Sections))
				;

			Mapper.CreateMap<NavLinksDto, NavLinks>()
				.ForMember(dest => dest.NavLinksID, opt => opt.MapFrom(src => src.id))
				.ForMember(dest => dest.Sections, opt => opt.MapFrom(src => src.sections))
				;
		
			Mapper.CreateMap<NavLinksSectionDto, NavLinksSection>();
			Mapper.CreateMap<NavLinksSection, NavLinksSectionDto>();

			Mapper.CreateMap<NavLinksSectionLinkDto, NavLinksSectionLink>();
			Mapper.CreateMap<NavLinksSectionLink, NavLinksSectionLinkDto>();
		}
	}


	public class NavLinksDto
	{
		public int id { get; set; }
		public string name { get; set; }
		public string userName { get; set; }
		public List<NavLinksSectionDto> sections { get; set; }

		public static implicit operator NavLinksDto(Links links)
		{
			var dto = Mapper.Map<Links, NavLinksDto>(links);
			return dto;
		}

		public static implicit operator NavLinksDto(NavLinks links)
		{
			if (links == null) return null;
			var dto = Mapper.Map<NavLinks, NavLinksDto>(links);
			return dto;
		}

		public static implicit operator NavLinks(NavLinksDto links)
		{
			var dobj = Mapper.Map<NavLinksDto, NavLinks>(links);
			return dobj;
		}
	}
}