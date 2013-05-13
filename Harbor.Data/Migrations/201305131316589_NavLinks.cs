namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NavLinks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.NavLinks",
                c => new
                    {
                        NavLinksID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        UserName = c.String(nullable: false, maxLength: 50),
                        TemplateStr = c.String(),
                        Page_PageID = c.Int(),
                    })
                .PrimaryKey(t => t.NavLinksID)
                .ForeignKey("dbo.Users", t => t.UserName, cascadeDelete: true)
                .ForeignKey("dbo.Pages", t => t.Page_PageID)
                .Index(t => t.UserName)
                .Index(t => t.Page_PageID);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.NavLinks", new[] { "Page_PageID" });
            DropIndex("dbo.NavLinks", new[] { "UserName" });
            DropForeignKey("dbo.NavLinks", "Page_PageID", "dbo.Pages");
            DropForeignKey("dbo.NavLinks", "UserName", "dbo.Users");
            DropTable("dbo.NavLinks");
        }
    }
}
