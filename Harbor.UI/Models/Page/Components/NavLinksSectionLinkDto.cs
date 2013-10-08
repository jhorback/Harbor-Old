using AutoMapper;
using Harbor.Domain.PageNav;

namespace Harbor.UI.Models.Components
{
	public class NavLinksSectionLinkDto
	{
		public int pageID { get; set; }

		public string text { get; set; }

		public static implicit operator NavLinksSectionLink(NavLinksSectionLinkDto link)
		{
			var dobj = Mapper.Map<NavLinksSectionLinkDto, NavLinksSectionLink>(link);
			return dobj;
		}

		public static implicit operator NavLinksSectionLinkDto(NavLinksSectionLink link)
		{
			var dobj = Mapper.Map<NavLinksSectionLink, NavLinksSectionLinkDto>(link);
			return dobj;
		}
	}
}