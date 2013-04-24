namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovePageParent : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Pages", "ParentPageID", "dbo.Pages");
            DropIndex("dbo.Pages", new[] { "ParentPageID" });
            DropColumn("dbo.Pages", "ParentPageID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Pages", "ParentPageID", c => c.Int());
            CreateIndex("dbo.Pages", "ParentPageID");
            AddForeignKey("dbo.Pages", "ParentPageID", "dbo.Pages", "PageID");
        }
    }
}
