namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FileRelations : DbMigration
    {
        public override void Up()
        {
            AddForeignKey("dbo.Files", "UserName", "dbo.Users", "UserName", cascadeDelete: true);
            CreateIndex("dbo.Files", "UserName");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Files", new[] { "UserName" });
            DropForeignKey("dbo.Files", "UserName", "dbo.Users");
        }
    }
}
