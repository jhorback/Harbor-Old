using Harbor.Domain.Files;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using Harbor.Domain.Security;

namespace Harbor.Domain.Tests
{


	[TestClass()]
	public class FileTest
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

		#region Additional test attributes
		// 
		//You can use the following additional attributes as you write your tests:
		//
		//Use ClassInitialize to run code before running the first test in the class
		//[ClassInitialize()]
		//public static void MyClassInitialize(TestContext testContext)
		//{
		//}
		//
		//Use ClassCleanup to run code after all tests in a class have run
		//[ClassCleanup()]
		//public static void MyClassCleanup()
		//{
		//}
		//
		//Use TestInitialize to run code before running each test
		//[TestInitialize()]
		//public void MyTestInitialize()
		//{
		//}
		//
		//Use TestCleanup to run code after each test has run
		//[TestCleanup()]
		//public void MyTestCleanup()
		//{
		//}
		//
		#endregion


		#region HasPermission
		[TestMethod]
		public void HasPermission_PublicFile_NonOwnerCanRead()
		{
			File target = new File { UserName = "joe", Public = true };
			bool expected = true;
			bool actual = target.HasPermission("nonOwner", Permissions.Read);
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_NonPublicFile_NonOwnerCanRead()
		{
			File target = new File { UserName = "joe", Public = false };
			bool expected = false;
			bool actual = target.HasPermission("nonOwner", Permissions.Read);
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_NonPublicFile_OwnerCanRead()
		{
			File target = new File { UserName = "joe", Public = false };
			bool expected = true;
			bool actual = target.HasPermission("joe", Permissions.Read);
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_RequestingUpdatePermission_OwnerCanUpdate()
		{
			File target = new File { UserName = "joe", Public = true };
			bool expected = true;
			bool actual = target.HasPermission("joe", Permissions.Update);
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_RequestingUpdatePermission_NonOwnerCannotUpdate()
		{
			File target = new File { UserName = "joe", Public = true };
			bool expected = false;
			bool actual = target.HasPermission("nonOwner", Permissions.Update);
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_RequestingDeletePermission_OwnerCanDelete()
		{
			File target = new File { UserName = "joe", Public = true };
			bool expected = true;
			bool actual = target.HasPermission("joe", Permissions.Delete);
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_RequestingDeletePermission_NonOwnerCannotDelete()
		{
			File target = new File { UserName = "joe", Public = true };
			bool expected = false;
			bool actual = target.HasPermission("nonOwner", Permissions.Delete);
			Assert.AreEqual(expected, actual);
		}
		#endregion

		#region GetPhysicalPath
		
		[TestMethod]
		public void GetPhysicalPath_OriginalResolution_ExpectedPathReturned()
		{
			var file = new File(userName: "jhorback", fileName: "test.jpg");
			var expected = File.UsersFolderPhysicalPath() + file.UserName + "/" + file.FileID + ".jpg";
			var actual = file.GetPhysicalPath();
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void GetPhysicalPath_LowResolution_ExpectedPathReturned()
		{
			var file = new File(userName: "jhorback", fileName: "test.jpg") { ResolutionsCreated = FileResolution.Low };
			var expected = File.UsersFolderPhysicalPath() + file.UserName + "/" + file.FileID + "-low.jpg";
			var actual = file.GetPhysicalPath(FileResolution.Low);
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void GetPhysicalPath_LowResolutionNotSet_ExpectedPathReturned()
		{
			var file = new File(userName: "jhorback", fileName: "test.jpg");
			var expected = File.UsersFolderPhysicalPath() + file.UserName + "/" + file.FileID + ".jpg";
			var actual = file.GetPhysicalPath(FileResolution.Low);
			Assert.AreEqual(expected, actual);
		}


		[TestMethod]
		public void GetPhysicalPath_AfterSettingANewResolution_ExpectedPathReturned()
		{
			var file = new File(userName: "jhorback", fileName: "test.jpg");
			var res = FileResolution.Low;
			file.ResolutionsCreated = file.ResolutionsCreated.AddRes(res);
			var expected = File.UsersFolderPhysicalPath() + file.UserName + "/" + file.FileID + "-low.jpg";
			var actual = file.GetPhysicalPath(res);
			Assert.AreEqual(expected, actual);
		}
		#endregion

		#region ResolutionsCreated
		[TestMethod]
		public void ResolutionsCreated_SetOneResolution_ResolutionsIntIsCorrect()
		{
			File target = new File { UserName = "joe", Public = true };
			target.ResolutionsCreated = FileResolution.Low;
			int expected = 2;
			int actual = target.Resolutions;
			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void ResolutionsCreated_SetTwoResolutions_ResolutionsIntIsCorrect()
		{
			File target = new File { UserName = "joe", Public = true };
			target.ResolutionsCreated = target.ResolutionsCreated.AddRes(FileResolution.Low);
			int expected = 3;
			int actual = target.Resolutions;

			Assert.IsTrue(target.ResolutionsCreated.HasFlag(FileResolution.Original));
			Assert.IsTrue(target.ResolutionsCreated.HasFlag(FileResolution.Low));
			Assert.AreEqual(expected, actual);
		}


		[TestMethod]
		public void ResolutionsCreated_SetResolutionsInt_ResolutionsCreatedIsCorrect()
		{
			File target = new File { UserName = "joe", Public = true };

			Assert.IsFalse(target.ResolutionsCreated.HasFlag(FileResolution.Low));

			target.Resolutions = 3;

			Assert.IsTrue(target.ResolutionsCreated.HasFlag(FileResolution.Original));
			Assert.IsTrue(target.ResolutionsCreated.HasFlag(FileResolution.Low));
		}
		#endregion
	}
}
