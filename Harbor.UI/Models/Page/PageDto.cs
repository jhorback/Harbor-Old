using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using Harbor.Domain.Pages;
using System.Linq;

namespace Harbor.UI.Models
{
	public class PageDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Page, PageDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.PageID))
				.ForMember(dest => dest.author, opt => opt.MapFrom(src => src.AuthorsUserName))
				.ForMember(dest => dest.published, opt => opt.MapFrom(src => src.Public))
				.ForMember(dest => dest.properties, opt => opt.MapFrom(src => src.Properties))
				.ForMember(dest => dest.created, opt => opt.MapFrom(src => src.Created.ToShortDateString()))
				.ForMember(dest => dest.modified, opt => opt.MapFrom(src => src.Modified.ToShortDateString()))
				;

			Mapper.CreateMap<PageDto, Page>()
				.ForMember(dest => dest.AuthorsUserName, opt => opt.MapFrom(src => src.author))
				.ForMember(dest => dest.Public, opt => opt.MapFrom(src => src.published))
				.ForMember(dest => dest.Properties, opt => opt.MapFrom(src => src.properties))
				.ForMember(dest => dest.Created, opt => opt.Ignore())
				.ForMember(dest => dest.Modified, opt => opt.Ignore())
				.ForMember(dest => dest.PageID, opt => opt.Ignore())
				.ForMember(dest => dest.Properties, opt => opt.Ignore())
				.AfterMap((dto, DO) =>
				    {
						// add / update
						foreach (var prop in dto.properties)
						{
							DO.SetProperty(prop.name, prop.value);
						}
						
						// delete
						var propNames = DO.Properties.Select(p => p.Name).ToList();
						foreach (var propName in propNames)
						{
							if (dto.properties.Find(p => p.name == propName) == null)
							{
								DO.DeleteProperty(propName);
							}
						}
				    });
		}
	}

	public class PageDto
	{
		public PageDto()
		{
			properties = new List<PagePropertyDto>();
		}

		public int id { get; set; }
		public string title { get; set; }
		public string author { get; set; }
		public string pageTypeKey { get; set; }
		public string created { get; set; }
		public string modified { get; set; }
		public bool enabled { get; set; }
		public bool published { get; set; }
		public TemplateDto template { get; set; }
		public List<PagePropertyDto> properties { get; set; }

		public static implicit operator PageDto(Page page)
		{
			return Mapper.Map<Page, PageDto>(page);
		}

		public static implicit operator Page(PageDto page)
		{
			return Mapper.Map<PageDto, Page>(page);
		}
	}
}