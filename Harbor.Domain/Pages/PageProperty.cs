using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Harbor.Domain.Pages
{
	public class PageProperty : IEntity
	{
		public PageProperty()
		{
		}

		public int PagePropertyID { get; set; }

		public int PageID { get; set; }

		[Required]
		[StringLength(50)]
		public string Name { get; set; }

		public string Value { get; set; }

		public override string ToString()
		{
			return "PageProperty:" + Name + ":" + Value;
		}
	}
}
