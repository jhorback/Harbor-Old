
namespace Harbor.Domain.AppMenu.Queries
{
	public class MenuItemDto
	{
		public string parentId { get; set; }
		public string id { get; set; }
		public string text { get; set; }
		public string url { get; set; }
		public bool isMenu
		{
			get { return string.IsNullOrEmpty(url); }
		}
	}
}
