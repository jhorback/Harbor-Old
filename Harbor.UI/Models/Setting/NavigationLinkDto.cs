using AutoMapper;
using Harbor.Domain.App;

namespace Harbor.UI.Models.Setting
{
	public class NavigationLinkDto
	{
		public string text { get; set; }
		public int pageID { get; set; }
		
		public static implicit operator NavigationLink(NavigationLinkDto app)
		{
			var DO = Mapper.Map<NavigationLinkDto, NavigationLink>(app);
			return DO;
		}

		public static implicit operator NavigationLinkDto(NavigationLink app)
		{
			var DO = Mapper.Map<NavigationLink, NavigationLinkDto>(app);
			return DO;
		}
	}

	public class NavigationLinkDtoCreator : IBootstrapperTask
	{
		public void Execute()
		{
			Mapper.CreateMap<NavigationLinkDto, NavigationLink>();
			Mapper.CreateMap<NavigationLink, NavigationLinkDto>();
		}
	}
}