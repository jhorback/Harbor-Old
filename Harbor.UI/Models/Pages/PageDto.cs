﻿using System.Collections.Generic;
using AutoMapper;

namespace Harbor.UI.Models
{
	public class PageDtoMapCreator : IBootstrapperTask
	{
		private readonly IDtoMapper _dtoMapper;

		public PageDtoMapCreator(IDtoMapper dtoMapper)
		{
			_dtoMapper = dtoMapper;
		}

		public void Execute()
		{
			Mapper.CreateMap<Domain.Pages.Page, PageDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.PageID))
				.ForMember(dest => dest.author, opt => opt.MapFrom(src => src.AuthorsUserName))
				.ForMember(dest => dest.published, opt => opt.MapFrom(src => src.Public))
				.ForMember(dest => dest.properties, opt => opt.MapFrom(src => src.Properties))
				.ForMember(dest => dest.created, opt => opt.MapFrom(src => src.Created.ToShortDateString()))
				.ForMember(dest => dest.modified, opt => opt.MapFrom(src => src.Modified.ToShortDateString()))
				.ForMember(dest => dest.template, opt => opt.MapFrom(src => TemplateDto.FromTemplate(src.Template, _dtoMapper)))
				.ForMember(dest => dest.layout, opt => opt.MapFrom(src => PageLayoutDto.FromPageLayout(src.Layout, _dtoMapper)))
				;

			Mapper.CreateMap<PageDto, Domain.Pages.Page>()
				.ForMember(dest => dest.AuthorsUserName, opt => opt.MapFrom(src => src.author))
				.ForMember(dest => dest.Public, opt => opt.MapFrom(src => src.published))
				.ForMember(dest => dest.Layout, opt => opt.Ignore())
				.ForMember(dest => dest.Created, opt => opt.Ignore())
				.ForMember(dest => dest.Modified, opt => opt.Ignore())
				.ForMember(dest => dest.PageID, opt => opt.Ignore())
				.ForMember(dest => dest.Properties, opt => opt.Ignore())
				.ForMember(dest => dest.PreviewImage, opt => opt.Ignore())
				.ForMember(dest => dest.Files, opt => opt.Ignore())
				.ForMember(dest => dest.PageLinks, opt => opt.Ignore())
				.ForMember(dest => dest.PayPalButtons, opt => opt.Ignore())
				.ForMember(dest => dest.Template, opt => opt.Ignore())
				.AfterMap((dto, DO) =>
				    {
						DO.Template = TemplateDto.ToTemplate(dto.template, DO.Template);
						
						// add / update
						foreach (var prop in dto.properties)
						{
							DO.SetProperty(prop.name, prop.value);
						}

						// page layout
						DO.Layout = PageLayoutDto.ToPageLayout(DO.Layout, dto.layout);
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
		public string titleBackgroundUrl { get; set; }
		public string pageClassNames { get; set; }
		public string author { get; set; }
		public string pageTypeKey { get; set; }
		public string pageTypeName { get; set; }
		public string created { get; set; }
		public string modified { get; set; }
		public bool enabled { get; set; }
		public bool published { get; set; }
		public int pageLayoutId { get; set; }
		public TemplateDto template { get; set; }
		public PageLayoutDto layout { get; set; }
		public List<PagePropertyDto> properties { get; set; }
		
		public FileDto previewImage { get; set; }
		public string previewImageID { get; set; }
		public string previewText { get; set; }
		public bool autoPreviewText { get; set; }
		public bool autoPreviewImage { get; set; }
		public bool? isARootPage { get; set; }
		public string rootPageUrl { get; set; }

		public static PageDto FromPage(Domain.Pages.Page page)
		{
			var pageDto = Mapper.Map<Domain.Pages.Page, PageDto>(page);
			pageDto.pageTypeName = page.PageType == null ?
				string.Format("{0} (deprecated)", page.PageTypeKey) :
				page.PageType.Name;
			return pageDto;
		}
	}
}