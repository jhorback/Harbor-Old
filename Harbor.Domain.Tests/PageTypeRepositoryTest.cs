using System.Collections.Generic;
using System.Linq;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.PageTypes;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Harbor.Domain.Tests
{

	[TestClass]
	public class PageTypeRepositoryTest
	{
		List<PageType> getPageTypes()
		{
			return new List<PageType>
			{
				new PageListing(),
				new Pages.PageTypes.Page(),
				new Article(),
				new Product()
			};
		}

		[TestMethod]
		public void GetPageTypesToAdd_IsNotEmpty()
		{
			var repo = new PageTypeRepository(getPageTypes());

			var types = repo.GetPageTypesToAdd();

			Assert.IsTrue(types.Any());
			Assert.IsTrue(types["primary"].Any());
			Assert.IsTrue(types["other"].Any());
		}

		[TestMethod]
		public void GetPageTypesToAdd_PageListingContainsPage_DoesNotContainPageListing()
		{
			var repo = new PageTypeRepository(getPageTypes());

			var typesDict = repo.GetPageTypesToAdd("pageListing");
			var types = typesDict["primary"];
			types.AddRange(typesDict["other"]);


			Assert.IsTrue(types.Any(p => p.Key == "page"));
			Assert.IsFalse(types.Any(p => p.Key == "pageListing"));
		}
	}
}
