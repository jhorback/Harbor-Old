namespace Harbor.Domain.Pages
{
	public interface IPageCommandService
	{
		void Execute(IPageCommand command);
	}
}