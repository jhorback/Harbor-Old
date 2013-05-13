using System.ComponentModel.DataAnnotations;
using Harbor.Domain.Security;

namespace Harbor.Domain.PageNav
{
	public class NavLinks
	{
		[Key]
		public int NavLinksID { get; set; }

		[Required]
		[StringLength(100)]
		public string Name { get; set; }

		[Required]
		[StringLength(50)]
		public string UserName { get; set; }
		
		public string TemplateStr
		{ 
			get
			{
				return Template.ToString();
			}
			set
			{
				Template = NavLinksTemplate.Parse(value);
			}
		}

		#region associations
		public User Owner { get; set; }
		#endregion

		public NavLinksTemplate Template { get; set; }
	}
}
