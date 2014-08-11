﻿using Harbor.Domain.Diagnostics;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Commands;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

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
			
			mockObjectFactory.Setup(o => o.GetInstance(typeof(TestCommandHandler))).Returns(new TestCommandHandler());
			
			var pcs = new PageCommandService(reflectionUtils, logger, mockObjectFactory.Object);
			var testCommand = new TestCommand { TestMessage = "Initial Message" };
			
			pcs.Execute(testCommand);

			Assert.IsTrue(testCommand.TestMessage == "Command Executed");
		}

		[TestMethod]
		public void GetCommandType_ReturnsTheType()
		{
			var reflectionUtils = new ReflectionUtils();
			var logger = new Logger(typeof(PageCommandServiceTest));
			var mockObjectFactory = new Mock<IObjectFactory>();

			mockObjectFactory.Setup(o => o.GetInstance(typeof(TestCommandHandler))).Returns(new TestCommandHandler());

			var pcs = new PageCommandService(reflectionUtils, logger, mockObjectFactory.Object);

			var type = pcs.GetCommandType("TestCommand");

			Assert.AreEqual(typeof(TestCommand), type);
		}
	}
}