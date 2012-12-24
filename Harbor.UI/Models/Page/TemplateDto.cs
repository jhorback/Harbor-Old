using System.Collections.Generic;
using AutoMapper;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models
{
	public class TemplateDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Template, TemplateDto>()
				.BeforeMap((d, dto) =>
				{
					var props = d.Layout;
					var noAside = d.Layout.HasFlag(LayoutProperties.NoAside);
				})
				.ForMember(dest => dest.layoutIsCentered,
						   opt => opt.MapFrom(src => src.Layout.HasFlag(LayoutProperties.ContentCentered)))
				.ForMember(dest => dest.layoutIsReadable,
						   opt => opt.MapFrom(src => src.Layout.HasFlag(LayoutProperties.ContentReadable)))
				.ForMember(dest => dest.layoutHasNoSidebar,
						   opt => opt.MapFrom(src => src.Layout.HasFlag(LayoutProperties.NoAside)));

			Mapper.CreateMap<TemplateDto, Template>()
				.ForMember(dest => dest.Layout,
				           opt => opt.MapFrom(src => getLayoutProperties(src)));
		}

		LayoutProperties getLayoutProperties(TemplateDto dto)
		{
			var p = LayoutProperties.None;
			if (dto.layoutHasNoSidebar)
				p = p | LayoutProperties.NoAside;
			if (dto.layoutIsCentered)
				p = p | LayoutProperties.ContentCentered;
			if (dto.layoutIsReadable)
				p = p | LayoutProperties.ContentReadable;
			return p;
		}
	}

	public class TemplateDto
	{
		public int pageID { get; set; }
		public string pageTypeKey { get; set; }
		public bool layoutIsCentered { get; set; }
		public bool layoutIsReadable { get; set; }
		public bool layoutHasNoSidebar { get; set; }
		public PageHeader header { get; set; }
		public List<PageAside> aside { get; set; }
		public List<PageContent> content { get; set; }
		public int componentCounter { get; set; }

		public static implicit operator TemplateDto(Template page)
		{
			return Mapper.Map<Template, TemplateDto>(page);
		}

		public static implicit operator Template(TemplateDto page)
		{
			return Mapper.Map<TemplateDto, Template>(page);
		}
	}
}