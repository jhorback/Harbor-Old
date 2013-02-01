namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PagePreview : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pages", "PreviewImageID", c => c.Guid());
            AddColumn("dbo.Pages", "PreviewText", c => c.String());
            AddColumn("dbo.Pages", "AutoPreview", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Pages", "TemplateStr", c => c.String(nullable: false));
            AddForeignKey("dbo.Pages", "PreviewImageID", "dbo.Files", "FileID");
            CreateIndex("dbo.Pages", "PreviewImageID");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Pages", new[] { "PreviewImageID" });
            DropForeignKey("dbo.Pages", "PreviewImageID", "dbo.Files");
            AlterColumn("dbo.Pages", "TemplateStr", c => c.String());
            DropColumn("dbo.Pages", "AutoPreview");
            DropColumn("dbo.Pages", "PreviewText");
            DropColumn("dbo.Pages", "PreviewImageID");
        }
    }
}
