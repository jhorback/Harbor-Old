using AutoMapper;

namespace Harbor.UI.Models.Setting
{
	public class HarborAppDto
	{
		public string applicationName { get; set; }
		public bool showSignInLink { get; set; }
		public int? homePageID { get; set; }
		public PageDto homePage { get; set; }
		public NavigationLinkDto[] navigationLinks { get; set; }
		public string theme { get; set; }

		public static implicit operator HarborAppDto(Domain.App.HarborApp app)
		{
			var dto = Mapper.Map<Domain.App.HarborApp, HarborAppDto>(app);
			return dto;
		}

		public static implicit operator Domain.App.HarborApp(HarborAppDto app)
		{
			var DO = Mapper.Map<HarborAppDto, Domain.App.HarborApp>(app);
			return DO;
		}
	}

	public class HarborAppDtoCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<Domain.App.HarborApp, HarborAppDto>();

			Mapper.CreateMap<HarborAppDto, Domain.App.HarborApp>();
		}
	}
}