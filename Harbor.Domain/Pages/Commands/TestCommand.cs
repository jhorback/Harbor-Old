
namespace Harbor.Domain.Pages
{
	public class TestCommand : IPageCommand
	{
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
