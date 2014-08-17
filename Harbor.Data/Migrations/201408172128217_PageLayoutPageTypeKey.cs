namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PageLayoutPageTypeKey : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PageLayouts", "PageTypeKey", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PageLayouts", "PageTypeKey");
        }
    }
}
