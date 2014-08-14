
namespace Harbor.Domain.Pages
{
	public class PageCommandService : CommandService<IPageCommand>, IPageCommandService
	{
		public PageCommandService(ICommandContainerRepository commandContainerRepository)
			: base(commandContainerRepository, typeof(IPageCommandHandler), typeof(IPageCommandHandler<>))
		{
			
		}
	}

	public interface IPageCommandService
	{
		void Execute(IPageCommand command);
	}

	public interface IPageCommand : ICommand
	{
		int PageID { get; set; }
	}

	public interface IPageCommandHandler<in T> : IPageCommandHandler
	{
		void Execute(T command);
	}

	public interface IPageCommandHandler
	{

	}
}
