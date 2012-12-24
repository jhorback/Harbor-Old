namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FileResolutionsEnum : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Files", "Resolutions", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Files", "Resolutions");
        }
    }
}
