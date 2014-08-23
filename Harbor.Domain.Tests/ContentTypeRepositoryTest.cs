using System.Linq;
using Harbor.Domain.Pages;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Harbor.Domain.Tests
{
	[TestClass]
	public class ContentTypeRepositoryTest
	{

		[TestMethod]
		public void GetTemplateContentTypes_ReturnsAnyStaticTypes()
		{
			var repo = new ContentTypeRepository(null, null);

			var contentTypes = repo.GetTemplateContentTypes();
			
			Assert.IsTrue(contentTypes.Any());
		}
	}
}
