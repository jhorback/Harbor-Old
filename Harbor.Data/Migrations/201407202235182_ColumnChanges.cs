namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ColumnChanges : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PageLayouts", "HeaderDataStr", c => c.String());
            AddColumn("dbo.PageLayouts", "AsideDataStr", c => c.String());
            DropColumn("dbo.Files", "Resolutions");
            DropColumn("dbo.PageLayouts", "HeaderData");
            DropColumn("dbo.PageLayouts", "AsideData");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PageLayouts", "AsideData", c => c.String());
            AddColumn("dbo.PageLayouts", "HeaderData", c => c.String());
            AddColumn("dbo.Files", "Resolutions", c => c.Int(nullable: false));
            DropColumn("dbo.PageLayouts", "AsideDataStr");
            DropColumn("dbo.PageLayouts", "HeaderDataStr");
        }
    }
}
