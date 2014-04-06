namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PageLayout : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.NavLinks", "UserName", "dbo.Users");
            DropForeignKey("dbo.PageNavLinks", "Page_PageID", "dbo.Pages");
            DropForeignKey("dbo.PageNavLinks", "NavLinks_NavLinksID", "dbo.NavLinks");
            DropIndex("dbo.NavLinks", new[] { "UserName" });
            DropIndex("dbo.PageNavLinks", new[] { "Page_PageID" });
            DropIndex("dbo.PageNavLinks", new[] { "NavLinks_NavLinksID" });
            CreateTable(
                "dbo.PageLayouts",
                c => new
                    {
                        PageLayoutID = c.Int(nullable: false, identity: true),
                        UserName = c.String(maxLength: 50),
                        Title = c.String(maxLength: 100),
                        HeaderKey = c.String(),
                        HeaderData = c.String(),
                        AsideKey = c.String(),
                        AsideData = c.String(),
                    })
                .PrimaryKey(t => t.PageLayoutID)
                .ForeignKey("dbo.Users", t => t.UserName)
                .Index(t => t.UserName);
            
            AddColumn("dbo.Pages", "PageLayoutID", c => c.Int());
            AddForeignKey("dbo.Pages", "PageLayoutID", "dbo.PageLayouts", "PageLayoutID");
            CreateIndex("dbo.Pages", "PageLayoutID");
            DropColumn("dbo.Pages", "AlternateTitle");
            DropTable("dbo.NavLinks");
            DropTable("dbo.PageNavLinks");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PageNavLinks",
                c => new
                    {
                        Page_PageID = c.Int(nullable: false),
                        NavLinks_NavLinksID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Page_PageID, t.NavLinks_NavLinksID });
            
            CreateTable(
                "dbo.NavLinks",
                c => new
                    {
                        NavLinksID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        UserName = c.String(nullable: false, maxLength: 50),
                        TemplateStr = c.String(),
                    })
                .PrimaryKey(t => t.NavLinksID);
            
            AddColumn("dbo.Pages", "AlternateTitle", c => c.String(maxLength: 100));
            DropIndex("dbo.PageLayouts", new[] { "UserName" });
            DropIndex("dbo.Pages", new[] { "PageLayoutID" });
            DropForeignKey("dbo.PageLayouts", "UserName", "dbo.Users");
            DropForeignKey("dbo.Pages", "PageLayoutID", "dbo.PageLayouts");
            DropColumn("dbo.Pages", "PageLayoutID");
            DropTable("dbo.PageLayouts");
            CreateIndex("dbo.PageNavLinks", "NavLinks_NavLinksID");
            CreateIndex("dbo.PageNavLinks", "Page_PageID");
            CreateIndex("dbo.NavLinks", "UserName");
            AddForeignKey("dbo.PageNavLinks", "NavLinks_NavLinksID", "dbo.NavLinks", "NavLinksID", cascadeDelete: true);
            AddForeignKey("dbo.PageNavLinks", "Page_PageID", "dbo.Pages", "PageID", cascadeDelete: true);
            AddForeignKey("dbo.NavLinks", "UserName", "dbo.Users", "UserName");
        }
    }
}
