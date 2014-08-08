
namespace Harbor.Domain.Pages
{
	public class AddNewPageToLinks : IPageCommand
	{
		public string User { get; set; }
		public int PageID { get; set; }
		public string Title { get; set; }
		public string PageType { get; set; }
		public int SectionIndex { get; set; }
	}
}
