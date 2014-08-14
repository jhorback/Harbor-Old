namespace Harbor.Domain.Pages
{
	public interface IPageCommand : ICommand
	{
		int PageID { get; set; }
	}
}