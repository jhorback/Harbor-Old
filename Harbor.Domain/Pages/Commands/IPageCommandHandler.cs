namespace Harbor.Domain.Pages
{
	public interface IPageCommandHandler<in T> : IPageCommandHandler
	{
		void Execute(T command);
	}

	public interface IPageCommandHandler
	{
		
	}
}