namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NullablePayPalTaxAndShipping : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PayPalButtons", "ShippingOverride", c => c.Decimal(precision: 18, scale: 2));
            AlterColumn("dbo.PayPalButtons", "TaxOverride", c => c.Decimal(precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PayPalButtons", "TaxOverride", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.PayPalButtons", "ShippingOverride", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
