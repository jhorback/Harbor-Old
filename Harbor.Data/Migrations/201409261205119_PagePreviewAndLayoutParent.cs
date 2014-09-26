namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PagePreviewAndLayoutParent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PageLayouts", "ParentPageID", c => c.Int());
            AddColumn("dbo.Pages", "AutoPreviewText", c => c.Boolean(nullable: false));
            AddColumn("dbo.Pages", "AutoPreviewImage", c => c.Boolean(nullable: false));
            DropColumn("dbo.Pages", "AutoPreview");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Pages", "AutoPreview", c => c.Boolean(nullable: false));
            DropColumn("dbo.Pages", "AutoPreviewImage");
            DropColumn("dbo.Pages", "AutoPreviewText");
            DropColumn("dbo.PageLayouts", "ParentPageID");
        }
    }
}
