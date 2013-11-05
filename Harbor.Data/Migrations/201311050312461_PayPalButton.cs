namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PayPalButton : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PayPalButtons",
                c => new
                    {
                        PayPalButtonID = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 50),
                        Name = c.String(nullable: false, maxLength: 150),
                        Description = c.String(maxLength: 150),
                        Hosted = c.Boolean(nullable: false),
                        ButtonCode = c.String(),
                        ButtonType = c.String(maxLength: 50),
                        ItemNumber = c.String(maxLength: 50),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ShippingOverride = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TaxOverride = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.PayPalButtonID)
                .ForeignKey("dbo.Users", t => t.UserName)
                .Index(t => t.UserName);
            
            CreateTable(
                "dbo.PagePayPalButtons",
                c => new
                    {
                        Page_PageID = c.Int(nullable: false),
                        PayPalButton_PayPalButtonID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Page_PageID, t.PayPalButton_PayPalButtonID })
                .ForeignKey("dbo.Pages", t => t.Page_PageID, cascadeDelete: true)
                .ForeignKey("dbo.PayPalButtons", t => t.PayPalButton_PayPalButtonID, cascadeDelete: true)
                .Index(t => t.Page_PageID)
                .Index(t => t.PayPalButton_PayPalButtonID);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.PagePayPalButtons", new[] { "PayPalButton_PayPalButtonID" });
            DropIndex("dbo.PagePayPalButtons", new[] { "Page_PageID" });
            DropIndex("dbo.PayPalButtons", new[] { "UserName" });
            DropForeignKey("dbo.PagePayPalButtons", "PayPalButton_PayPalButtonID", "dbo.PayPalButtons");
            DropForeignKey("dbo.PagePayPalButtons", "Page_PageID", "dbo.Pages");
            DropForeignKey("dbo.PayPalButtons", "UserName", "dbo.Users");
            DropTable("dbo.PagePayPalButtons");
            DropTable("dbo.PayPalButtons");
        }
    }
}
