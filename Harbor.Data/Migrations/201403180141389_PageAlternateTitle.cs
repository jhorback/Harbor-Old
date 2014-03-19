namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PageAlternateTitle : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pages", "AlternateTitle", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Pages", "AlternateTitle");
        }
    }
}
