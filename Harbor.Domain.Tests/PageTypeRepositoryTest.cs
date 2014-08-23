using System.Linq;
using Harbor.Domain.Pages;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Harbor.Domain.Tests
{
	[TestClass]
	public class PageTypeRepositoryTest
	{
		private TestContext testContextInstance;

		public TestContext TestContext
		{
			get
			{
				return testContextInstance;
			}
			set
			{
				testContextInstance = value;
			}
		}


		[TestMethod]
		public void GetPageTypesToAdd_IsNotEmpty()
		{
			var repo = new PageTypeRepository();

			var types = repo.GetPageTypesToAdd();

			Assert.IsTrue(types.Any());
			Assert.IsTrue(types["primary"].Any());
			Assert.IsTrue(types["other"].Any());
		}

		// jch! - add more tests for the sub page types
	}
}
