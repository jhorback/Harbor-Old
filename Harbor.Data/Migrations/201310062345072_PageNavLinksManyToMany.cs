namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PageNavLinksManyToMany : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.NavLinks", "UserName", "dbo.Users");
            DropForeignKey("dbo.NavLinks", "Page_PageID", "dbo.Pages");
            DropIndex("dbo.NavLinks", new[] { "UserName" });
            DropIndex("dbo.NavLinks", new[] { "Page_PageID" });
            CreateTable(
                "dbo.PageNavLinks",
                c => new
                    {
                        Page_PageID = c.Int(nullable: false),
                        NavLinks_NavLinksID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Page_PageID, t.NavLinks_NavLinksID })
                .ForeignKey("dbo.Pages", t => t.Page_PageID, cascadeDelete: true)
                .ForeignKey("dbo.NavLinks", t => t.NavLinks_NavLinksID, cascadeDelete: true)
                .Index(t => t.Page_PageID)
                .Index(t => t.NavLinks_NavLinksID);
            
            AddForeignKey("dbo.NavLinks", "UserName", "dbo.Users", "UserName");
            CreateIndex("dbo.NavLinks", "UserName");
            DropColumn("dbo.NavLinks", "Page_PageID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.NavLinks", "Page_PageID", c => c.Int());
            DropIndex("dbo.PageNavLinks", new[] { "NavLinks_NavLinksID" });
            DropIndex("dbo.PageNavLinks", new[] { "Page_PageID" });
            DropIndex("dbo.NavLinks", new[] { "UserName" });
            DropForeignKey("dbo.PageNavLinks", "NavLinks_NavLinksID", "dbo.NavLinks");
            DropForeignKey("dbo.PageNavLinks", "Page_PageID", "dbo.Pages");
            DropForeignKey("dbo.NavLinks", "UserName", "dbo.Users");
            DropTable("dbo.PageNavLinks");
            CreateIndex("dbo.NavLinks", "Page_PageID");
            CreateIndex("dbo.NavLinks", "UserName");
            AddForeignKey("dbo.NavLinks", "Page_PageID", "dbo.Pages", "PageID");
            AddForeignKey("dbo.NavLinks", "UserName", "dbo.Users", "UserName", cascadeDelete: true);
        }
    }
}
