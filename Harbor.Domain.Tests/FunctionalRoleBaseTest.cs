using System.Collections.Generic;
using Harbor.Domain.Security;
using Harbor.Domain.Security.Roles;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Harbor.Domain.Tests
{


	[TestClass()]
	public class FunctionalRoleBaseTest
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


		[TestMethod]
		public void HasPermission_GrantedPermission_ReturnsTrue()
		{
			var role = new PageAuthor();
			var expected = true;

			var actual = role.HasPermission(UserFunctionalArea.Pages, Permissions.Create);

			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_NonGrantedPermission_ReturnsFalse()
		{
			var role = new PageAuthor();
			var expected = false;

			var actual = role.HasPermission(UserFunctionalArea.Users, Permissions.Update);

			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_CompoundGrantedPermission_ReturnsTrue()
		{
			var role = new PageAuthor();
			var expected = true;

			var actual = role.HasPermission(UserFunctionalArea.Pages, Permissions.CreateAndUpdate);

			Assert.AreEqual(expected, actual);
		}
	}
}
