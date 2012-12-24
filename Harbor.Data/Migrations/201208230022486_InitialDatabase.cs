namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserName = c.String(nullable: false, maxLength: 50),
                        Password = c.String(maxLength: 48),
                        FirstName = c.String(nullable: false, maxLength: 50),
                        Email = c.String(maxLength: 150),
                        Created = c.DateTime(nullable: false),
                        LastLogin = c.DateTime(),
                        LastActivity = c.DateTime(),
                        MiddleName = c.String(maxLength: 50),
                        LastName = c.String(maxLength: 50),
                        Enabled = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.UserName);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserRoleID = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 50),
                        Role = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.UserRoleID)
                .ForeignKey("dbo.Users", t => t.UserName, cascadeDelete: true)
                .Index(t => t.UserName);
            
            CreateTable(
                "dbo.UserSettings",
                c => new
                    {
                        UserSettingID = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 50),
                        Name = c.String(nullable: false, maxLength: 50),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.UserSettingID)
                .ForeignKey("dbo.Users", t => t.UserName, cascadeDelete: true)
                .Index(t => t.UserName);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.UserSettings", new[] { "UserName" });
            DropIndex("dbo.UserRoles", new[] { "UserName" });
            DropForeignKey("dbo.UserSettings", "UserName", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "UserName", "dbo.Users");
            DropTable("dbo.UserSettings");
            DropTable("dbo.UserRoles");
            DropTable("dbo.Users");
        }
    }
}
