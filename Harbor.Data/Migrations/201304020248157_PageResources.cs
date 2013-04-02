namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PageResources : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Files", "UserName", "dbo.Users");
            DropIndex("dbo.Files", new[] { "UserName" });
            CreateTable(
                "dbo.PageFiles",
                c => new
                    {
                        Page_PageID = c.Int(nullable: false),
                        File_FileID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Page_PageID, t.File_FileID })
                .ForeignKey("dbo.Pages", t => t.Page_PageID, cascadeDelete: true)
                .ForeignKey("dbo.Files", t => t.File_FileID, cascadeDelete: true)
                .Index(t => t.Page_PageID)
                .Index(t => t.File_FileID);
            
            AddForeignKey("dbo.Files", "UserName", "dbo.Users", "UserName");
            CreateIndex("dbo.Files", "UserName");
        }
        
        public override void Down()
        {
            DropIndex("dbo.PageFiles", new[] { "File_FileID" });
            DropIndex("dbo.PageFiles", new[] { "Page_PageID" });
            DropIndex("dbo.Files", new[] { "UserName" });
            DropForeignKey("dbo.PageFiles", "File_FileID", "dbo.Files");
            DropForeignKey("dbo.PageFiles", "Page_PageID", "dbo.Pages");
            DropForeignKey("dbo.Files", "UserName", "dbo.Users");
            DropTable("dbo.PageFiles");
            CreateIndex("dbo.Files", "UserName");
            AddForeignKey("dbo.Files", "UserName", "dbo.Users", "UserName", cascadeDelete: true);
        }
    }
}
