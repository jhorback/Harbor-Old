namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PageTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PageProperties",
                c => new
                    {
                        PagePropertyID = c.Int(nullable: false, identity: true),
                        PageID = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.PagePropertyID)
                .ForeignKey("dbo.Pages", t => t.PageID, cascadeDelete: true)
                .Index(t => t.PageID);
            
            CreateTable(
                "dbo.Pages",
                c => new
                    {
                        PageID = c.Int(nullable: false, identity: true),
                        AuthorsUserName = c.String(nullable: false, maxLength: 50),
                        Title = c.String(nullable: false, maxLength: 100),
                        PageTypeKey = c.String(nullable: false, maxLength: 50),
                        ParentPageID = c.Int(),
                        Created = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        Public = c.Boolean(nullable: false),
                        TemplateStr = c.String(),
                        Enabled = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.PageID)
                .ForeignKey("dbo.Users", t => t.AuthorsUserName, cascadeDelete: true)
                .ForeignKey("dbo.Pages", t => t.ParentPageID)
                .Index(t => t.AuthorsUserName)
                .Index(t => t.ParentPageID);
            
            CreateTable(
                "dbo.PageRoles",
                c => new
                    {
                        PageRoleID = c.Int(nullable: false, identity: true),
                        PageID = c.Int(nullable: false),
                        SID = c.String(nullable: false, maxLength: 50),
                        Role = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.PageRoleID)
                .ForeignKey("dbo.Pages", t => t.PageID, cascadeDelete: true)
                .Index(t => t.PageID);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.PageRoles", new[] { "PageID" });
            DropIndex("dbo.Pages", new[] { "ParentPageID" });
            DropIndex("dbo.Pages", new[] { "AuthorsUserName" });
            DropIndex("dbo.PageProperties", new[] { "PageID" });
            DropForeignKey("dbo.PageRoles", "PageID", "dbo.Pages");
            DropForeignKey("dbo.Pages", "ParentPageID", "dbo.Pages");
            DropForeignKey("dbo.Pages", "AuthorsUserName", "dbo.Users");
            DropForeignKey("dbo.PageProperties", "PageID", "dbo.Pages");
            DropTable("dbo.PageRoles");
            DropTable("dbo.Pages");
            DropTable("dbo.PageProperties");
        }
    }
}
