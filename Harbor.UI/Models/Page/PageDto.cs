using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AutoMapper;
using Harbor.Domain.Pages;
using Harbor.UI.Models.Content;
using Harbor.UI.Models.Page;

namespace Harbor.UI.Models
{
	public class PageDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Domain.Pages.Page, PageDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.PageID))
				.ForMember(dest => dest.author, opt => opt.MapFrom(src => src.AuthorsUserName))
				.ForMember(dest => dest.published, opt => opt.MapFrom(src => src.Public))
				.ForMember(dest => dest.properties, opt => opt.MapFrom(src => src.Properties))
				.ForMember(dest => dest.created, opt => opt.MapFrom(src => src.Created.ToShortDateString()))
				.ForMember(dest => dest.modified, opt => opt.MapFrom(src => src.Modified.ToShortDateString()))
				.ForMember(dest => dest.pageLinks, opt => opt.Ignore())
				.ForMember(dest => dest.template, opt => opt.MapFrom(src => TemplateDto.FromTemplate(src.Template)))
				.ForMember(dest => dest.layout, opt => opt.MapFrom(src => PageLayoutDto.FromPageLayout(src.Layout)))
				.AfterMap((DO, dto) =>
					{
						dto.pageLinks = DO.PageLinks.Select(page => (PageReferenceDto) page).ToList();
					})
				;

			Mapper.CreateMap<PageDto, Domain.Pages.Page>()
				.ForMember(dest => dest.AuthorsUserName, opt => opt.MapFrom(src => src.author))
				.ForMember(dest => dest.Public, opt => opt.MapFrom(src => src.published))
				.ForMember(dest => dest.Template, opt => opt.MapFrom(src => TemplateDto.ToTemplate(src.template)))
				.ForMember(dest => dest.Layout, opt => opt.MapFrom(src => PageLayoutDto.ToPageLayout(src.layout)))
				.ForMember(dest => dest.Created, opt => opt.Ignore())
				.ForMember(dest => dest.Modified, opt => opt.Ignore())
				.ForMember(dest => dest.PageID, opt => opt.Ignore())
				.ForMember(dest => dest.Properties, opt => opt.Ignore())
				.ForMember(dest => dest.PreviewImage, opt => opt.Ignore())
				.ForMember(dest => dest.Files, opt => opt.Ignore())
				.ForMember(dest => dest.PageLinks, opt => opt.Ignore())
				.ForMember(dest => dest.PayPalButtons, opt => opt.Ignore())
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
			files = new List<FileDto>();
			pageLinks = new List<PageReferenceDto>();
		}

		public int id { get; set; }
		public string title { get; set; }
		public string alternateTitle { get; set; }
		public string author { get; set; }
		public string pageTypeKey { get; set; }
		public string created { get; set; }
		public string modified { get; set; }
		public bool enabled { get; set; }
		public bool published { get; set; }
		public TemplateDto template { get; set; }
		public PageLayoutDto layout { get; set; }
		public List<PagePropertyDto> properties { get; set; }
		
		public FileDto previewImage { get; set; }
		public string previewImageID { get; set; }
		public string previewText { get; set; }
		public bool autoPreview { get; set; }

		public List<FileDto> files { get; set; }
		public List<PageReferenceDto> pageLinks { get; set; }
		public List<PayPalButtonDto> payPalButtons { get; set; }

		public static PageDto FromPage(Domain.Pages.Page page)
		{
			return Mapper.Map<Domain.Pages.Page, PageDto>(page);			
		}
	}
}