namespace Harbor.Domain.Pages
{
	public interface IPageCommandHandler<in T> where T : IPageCommand
	{
		void Execute(T command);
	}
}