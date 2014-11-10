
namespace Harbor.Domain.Pages.Content
{
	public interface IPageContent
	{
		int? PreviewImageID { get; set; }
		string PreviewText { get; set; }
		int? PreviewPageID { get; set; }
	}

	public abstract class PageContent : IPageContent
	{
		public virtual int? PreviewImageID { get; set; }
		public string PreviewText { get; set; }
		public int? PreviewPageID { get; set; }
	}
}
