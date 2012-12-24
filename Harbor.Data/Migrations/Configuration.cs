using System;
using System.Data.Entity.Migrations;
using System.Data.Entity.Validation;
using System.Linq;
using Harbor.Domain.Security;
using Harbor.Domain.Security.Roles;

namespace Harbor.Data.Migrations
{
	public sealed class Configuration : DbMigrationsConfiguration<Harbor.Data.HarborContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = false;
			AutomaticMigrationDataLossAllowed = false;
		}

		protected override void Seed(Harbor.Data.HarborContext context)
		{
			base.Seed(context);


			var admin = context.Users.FirstOrDefault(u => u.UserName == "Admin");
			if (admin == null)
			{
				context.Users.Add(new User
				{
					UserName = "Admin",
					FirstName = "Admin",
					Created = DateTime.Now
				});
			}


			var adminSysAdminRole = context.UserRoles.FirstOrDefault(u => u.UserName == "Admin" && u.Role == SystemAdministrator.KEY);
			if (adminSysAdminRole == null)
			{
				context.UserRoles.Add(new UserRole
				{
					UserName = "Admin",
					Role = SystemAdministrator.KEY
				});
			}


			var adminUserAdminRole = context.UserRoles.FirstOrDefault(u => u.UserName == "Admin" && u.Role == UserAdministrator.KEY);
			if (adminUserAdminRole == null)
			{
				context.UserRoles.Add(new UserRole
				{
					UserName = "Admin",
					Role = UserAdministrator.KEY
				});
			}


			try
			{
				context.SaveChanges();
			}
			catch (DbEntityValidationException dbEx)
			{
				foreach (var validationErrors in dbEx.EntityValidationErrors)
				{
					foreach (var validationError in validationErrors.ValidationErrors)
					{
						System.Diagnostics.Debug.WriteLine("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage);
					}
				}
			}
		}
	}
}
