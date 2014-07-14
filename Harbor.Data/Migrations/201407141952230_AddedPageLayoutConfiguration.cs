namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedPageLayoutConfiguration : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PageLayouts", "UserName", "dbo.Users");
            AddForeignKey("dbo.PageLayouts", "UserName", "dbo.Users", "UserName");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PageLayouts", "UserName", "dbo.Users");
            AddForeignKey("dbo.PageLayouts", "UserName", "dbo.Users", "UserName", cascadeDelete: true);
        }
    }
}
