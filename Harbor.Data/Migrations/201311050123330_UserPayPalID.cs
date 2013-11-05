namespace Harbor.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserPayPalID : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "PayPalMerchantAccountID", c => c.String(maxLength: 150));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "PayPalMerchantAccountID");
        }
    }
}
