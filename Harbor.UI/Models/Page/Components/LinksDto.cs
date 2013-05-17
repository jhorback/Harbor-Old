using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.PageComponents;
using System.Linq;

namespace Harbor.UI.Models.Components
{
	public class LinksDto
	{
		public int id { get; set; }
		public string name { get; set; }
		public string userName { get; set; }
		public List<LinksSectionDto> sections { get; set; }

		public static implicit operator LinksDto(Links links)
		{
			return new LinksDto
				{
					id = links.NavLinksID,
					userName = links.UserName,
					name =  links.Name,
					sections = links.Sections.Select(s => new LinksSectionDto
						{
							title = s.Title,
							links = s.Links
						}).ToList()
				};
		}
	}


	public class LinksSectionDto
	{
		public string title { get; set; }
		public List<int> links { get; set; }
	}
}