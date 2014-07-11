namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpgradeToEF6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PageLayouts", "DisplayProperties", c => c.Int(nullable: false));
            AddColumn("dbo.Files", "ResolutionsCreated", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Files", "ResolutionsCreated");
            DropColumn("dbo.PageLayouts", "DisplayProperties");
        }
    }
}
