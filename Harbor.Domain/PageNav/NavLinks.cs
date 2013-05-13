
namespace Harbor.Domain.PageNav
{
	public class NavLinks
	{
		public int NavLinksID { get; set; }
		public string Name { get; set; }
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

		public NavLinksTemplate Template { get; set; }
	}
}
