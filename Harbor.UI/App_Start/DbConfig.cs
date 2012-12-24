using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace Harbor.UI
{
	public class DbConfig
	{
		public static void SetupDatabase()
		{
			try
            {
                var migrator = new DbMigrator(new Harbor.Data.Migrations.Configuration());
            	migrator.Update();
            }
            catch (System.Data.SqlClient.SqlException e)
            {
                // jch* - could forward to a pre-built view to make this pretty
                throw new Exception("Make sure the database is setup.", e);
            }
		}
	}
}