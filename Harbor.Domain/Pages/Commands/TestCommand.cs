
namespace Harbor.Domain.Pages.Commands
{
	public class TestCommand : IPageCommand
	{
		public int PageID { get; set; }
		public string TestMessage { get; set; }
	}

	public class TestCommandHandler : IPageCommandHandler<TestCommand>
	{
		public void Execute(TestCommand command)
		{
			command.TestMessage = "Command Executed";
		}
	}
}
