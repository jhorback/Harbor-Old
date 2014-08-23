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

		[TestMethod]
		public void GetPageTypesToAdd_PageListingContainsPage_DoesNotContainPageListing()
		{
			var repo = new PageTypeRepository();

			var typesDict = repo.GetPageTypesToAdd("pageListing");
			var types = typesDict["primary"];
			types.AddRange(typesDict["other"]);


			Assert.IsTrue(types.Any(p => p.Key == "page"));
			Assert.IsFalse(types.Any(p => p.Key == "pageListing"));
		}
	}
}
