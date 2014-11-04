using Harbor.Domain.Diagnostics;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Commands;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Moq.AutoMock;

namespace Harbor.Domain.Tests
{
	[TestClass]
	public class PageCommandServiceTest
	{
		[TestMethod]
		public void Execute_PullsHandlers_CallsExecute()
		{
			var reflectionUtils = new ReflectionUtils();
			var logger = new Logger(typeof(PageCommandServiceTest));
			var mockObjectFactory = new Mock<IObjectFactory>();
			var commandRepository = new CommandContainerRepository(mockObjectFactory.Object, new Mock<IMemCache>().Object);
			// var mockCommandContainerRepository = new Mock<CommandContainerRepository>();
			var commandContainer = new CommandContainer(reflectionUtils, logger, mockObjectFactory.Object);


			mockObjectFactory.Setup(o => o.GetInstance(typeof(TestCommandHandler))).Returns(new TestCommandHandler());
			mockObjectFactory.Setup(o => o.GetInstance<CommandContainer>()).Returns(commandContainer);


			var pcs = new PageCommandService(commandRepository);
			var testCommand = new TestCommand { TestMessage = "Initial Message" };
			
			pcs.Execute(testCommand);

			Assert.AreEqual(testCommand.TestMessage, "Command Executed");
		}
	}
}
