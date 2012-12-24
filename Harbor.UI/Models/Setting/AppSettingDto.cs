using AutoMapper;

namespace Harbor.UI.Models.Setting
{
	public class AppSettingDto
	{
		public int id { get; set; }
		public string name { get; set; }
		public string value { get; set; }

		public static implicit operator AppSettingDto(Domain.App.AppSetting setting)
		{
			var dto = Mapper.Map<Domain.App.AppSetting, AppSettingDto>(setting);
			return dto;
		}

		public static implicit operator Domain.App.AppSetting(AppSettingDto setting)
		{
			var DO = Mapper.Map<AppSettingDto, Domain.App.AppSetting>(setting);
			return DO;
		}
	}

	public class AppSettingDtoCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Domain.App.AppSetting, AppSettingDto>()
				.ForMember(dest => dest.id, opt => opt.MapFrom(src => src.AppSettingID));

			Mapper.CreateMap<AppSettingDto, Domain.App.AppSetting>()
				.ForMember(dest => dest.AppSettingID, opt => opt.Ignore());
				//.ForMember(dest => dest.AppSettingID, opt => opt.MapFrom(src => src.id));
		}
	}
}