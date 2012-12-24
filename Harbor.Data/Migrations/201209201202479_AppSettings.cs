namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AppSettings : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AppSettings",
                c => new
                    {
                        AppSettingID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        Value = c.String(),
                    })
                .PrimaryKey(t => t.AppSettingID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.AppSettings");
        }
    }
}
