namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PageLinks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PagePages",
                c => new
                    {
                        Page_PageID = c.Int(nullable: false),
                        Page_PageID1 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Page_PageID, t.Page_PageID1 })
                .ForeignKey("dbo.Pages", t => t.Page_PageID)
                .ForeignKey("dbo.Pages", t => t.Page_PageID1)
                .Index(t => t.Page_PageID)
                .Index(t => t.Page_PageID1);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.PagePages", new[] { "Page_PageID1" });
            DropIndex("dbo.PagePages", new[] { "Page_PageID" });
            DropForeignKey("dbo.PagePages", "Page_PageID1", "dbo.Pages");
            DropForeignKey("dbo.PagePages", "Page_PageID", "dbo.Pages");
            DropTable("dbo.PagePages");
        }
    }
}
