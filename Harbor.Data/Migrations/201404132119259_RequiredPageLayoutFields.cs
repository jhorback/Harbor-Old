namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RequiredPageLayoutFields : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.PageLayouts", "UserName", "dbo.Users");
            DropIndex("dbo.PageLayouts", new[] { "UserName" });
            AlterColumn("dbo.PageLayouts", "UserName", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.PageLayouts", "Title", c => c.String(nullable: false, maxLength: 100));
            AddForeignKey("dbo.PageLayouts", "UserName", "dbo.Users", "UserName", cascadeDelete: true);
            CreateIndex("dbo.PageLayouts", "UserName");
        }
        
        public override void Down()
        {
            DropIndex("dbo.PageLayouts", new[] { "UserName" });
            DropForeignKey("dbo.PageLayouts", "UserName", "dbo.Users");
            AlterColumn("dbo.PageLayouts", "Title", c => c.String(maxLength: 100));
            AlterColumn("dbo.PageLayouts", "UserName", c => c.String(maxLength: 50));
            CreateIndex("dbo.PageLayouts", "UserName");
            AddForeignKey("dbo.PageLayouts", "UserName", "dbo.Users", "UserName");
        }
    }
}
