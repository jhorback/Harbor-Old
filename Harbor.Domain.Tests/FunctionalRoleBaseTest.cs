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
		[TestMethod]
		public void HasPermission_GrantedPermission_ReturnsTrue()
		{
			var role = new PageAuthor();
			var expected = true;

			var actual = role.HasPermission(UserFeature.Pages, Permissions.Create);

			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_NonGrantedPermission_ReturnsFalse()
		{
			var role = new PageAuthor();
			var expected = false;

			var actual = role.HasPermission(UserFeature.Users, Permissions.Update);

			Assert.AreEqual(expected, actual);
		}

		[TestMethod]
		public void HasPermission_CompoundGrantedPermission_ReturnsTrue()
		{
			var role = new PageAuthor();
			var expected = true;

			var actual = role.HasPermission(UserFeature.Pages, Permissions.CreateAndUpdate);

			Assert.AreEqual(expected, actual);
		}
	}
}
