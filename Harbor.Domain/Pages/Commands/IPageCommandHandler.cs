namespace Harbor.Domain.Pages
{
	public interface IPageCommandHandler<T> where T : IPageCommand
	{
		void Execute(T command);
	}
}