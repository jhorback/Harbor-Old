namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FileIDToGuid : DbMigration
    {
        public override void Up()
        {
			DropPrimaryKey("dbo.Files", new [] { "FileID" });
			DropColumn("dbo.Files", "FileID");
			AddColumn("dbo.Files", "FileID", c => c.Guid(nullable: false, identity: true));
			AddPrimaryKey("dbo.Files", "FileID");
        }
        
        public override void Down()
        {
			DropPrimaryKey("dbo.Files", new[] { "FileID" });
			DropColumn("dbo.Files", "FileID");
			AddColumn("dbo.Files", "FileID", c => c.Int(nullable: false, identity: true));
			AddPrimaryKey("dbo.Files", "FileID");
        }
    }
}
