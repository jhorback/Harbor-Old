namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FileTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Files",
                c => new
                    {
                        FileID = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 50),
                        Album = c.String(maxLength: 100),
                        Name = c.String(nullable: false, maxLength: 100),
                        ContentType = c.String(nullable: false, maxLength: 150),
                        Ext = c.String(nullable: false, maxLength: 6),
                        Description = c.String(maxLength: 250),
                        Public = c.Boolean(nullable: false),
                        Uploaded = c.DateTime(nullable: false),
                        Modified = c.DateTime(nullable: false),
                        Size = c.Long(nullable: false),
                        TotalSize = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.FileID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Files");
        }
    }
}
