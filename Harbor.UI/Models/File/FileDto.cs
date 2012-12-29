using AutoMapper;
using Harbor.Domain.Files;

namespace Harbor.UI.Models
{
	public class FileDtoMapCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<File, FileDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.FileID))
				.ForMember(dest => dest.uploaded, opt => opt.MapFrom(src => src.Uploaded.ToShortDateString()))
				.ForMember(dest => dest.modified, opt => opt.MapFrom(src => src.Modified.ToShortDateString()))
				.ForMember(dest => dest.isBitmap, opt => opt.MapFrom(src => src.IsBitmap()))
				.ForMember(dest => dest.thumbUrl, opt => opt.MapFrom(src => FileUrls.GetThumbUrl(src)))
				.ForMember(dest => dest.href, opt => opt.MapFrom(src => FileUrls.GetUrl(src)))
				.ForMember(dest => dest.lowResUrl, opt => opt.MapFrom(src => FileUrls.GetLowResUrl(src)))
				.ForMember(dest => dest.highResUrl, opt => opt.MapFrom(src => FileUrls.GetHighResUrl(src)))
				;

			Mapper.CreateMap<FileDto, File>()
				.ForMember(dest => dest.Uploaded, opt => opt.Ignore())
				.ForMember(dest => dest.Modified, opt => opt.Ignore())
				.ForMember(dest => dest.FileID, opt => opt.Ignore())
				.ForMember(dest => dest.UserName, opt => opt.Ignore())
				.ForMember(dest => dest.ContentType, opt => opt.Ignore())
				.ForMember(dest => dest.Ext, opt => opt.Ignore())
				.ForMember(dest => dest.Size, opt => opt.Ignore())
				.ForMember(dest => dest.TotalSize, opt => opt.Ignore())
				;
		}
	}

	public class FileDto
	{
		public string id { get; set; }
		public string userName { get; set; }
		public string album { get; set; }
		public string name { get; set; }
		public string contentType { get; set; }
		public string ext { get; set; }
		public string description { get; set; }
		public bool @public { get; set; }
		public string uploaded { get; set; }
		public string modified { get; set; }
		public long size { get; set; }
		public long totalSize { get; set; }
		public bool isBitmap { get; set; }
		public string thumbUrl { get; set; }
		public string href { get; set; }
		public string lowResUrl { get; set; }
		public string highResUrl { get; set; }

		public static implicit operator FileDto(File page)
		{
			return Mapper.Map<File, FileDto>(page);
		}

		public static implicit operator File(FileDto page)
		{
			return Mapper.Map<FileDto, File>(page);
		}
	}
}