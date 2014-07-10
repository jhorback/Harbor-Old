using AutoMapper;

namespace Harbor.UI.Models
{
	public class PageReferenceDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Domain.Pages.Page, PageReferenceDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.PageID))
			;
		}
	}

	public class PageReferenceDto
	{
		public int id { get; set; }
		public string title { get; set; }
		public string author { get; set; }
		public string pageTypeKey { get; set; }
		public string created { get; set; }
		public string modified { get; set; }
		public bool enabled { get; set; }
		public bool published { get; set; }
		public string previewImageID { get; set; }
		public string previewText { get; set; }
		public bool autoPreview { get; set; }

		public static implicit operator PageReferenceDto(Domain.Pages.Page page)
		{
			return Mapper.Map<Domain.Pages.Page, PageReferenceDto>(page);
		}
	}
}