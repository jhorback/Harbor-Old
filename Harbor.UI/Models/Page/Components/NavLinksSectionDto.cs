using System.Collections.Generic;
using AutoMapper;
using Harbor.Domain.PageNav;

namespace Harbor.UI.Models.Components
{
	public class NavLinksSectionDto
	{
		public string title { get; set; }
		public List<int> links { get; set; }

		public static implicit operator NavLinksSection(NavLinksSectionDto sections)
		{
			var dobj = Mapper.Map<NavLinksSectionDto, NavLinksSection>(sections);
			return dobj;
		}

		public static implicit operator NavLinksSectionDto(NavLinksSection sections)
		{
			var dobj = Mapper.Map<NavLinksSection, NavLinksSectionDto>(sections);
			return dobj;
		}
	}
}