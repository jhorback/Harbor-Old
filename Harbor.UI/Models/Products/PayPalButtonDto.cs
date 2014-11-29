using Harbor.Domain.Products;

namespace Harbor.UI.Models.Products
{
	public class PayPalButtonDto
	{
		public int? id { get; set; }
		public string userName { get; set; }
		public string name { get; set; }
		public string description { get; set; }
		public bool hosted { get; set; }
		public string buttonCode { get; set; }
		public string buttonType { get; set; }
		public string itemNumber { get; set; }
		public decimal price { get; set; }
		public string displayPrice { get; set; }
		public decimal? shippingOverride { get; set; }
		public decimal? taxOverride { get; set; }

		public PayPalButtonDto() { }

		public PayPalButtonDto(PayPalButton button)
		{
			if (button != null)
			{
				id = button.PayPalButtonID;
				userName = button.UserName;
				name = button.Name;
				description = button.Description;
				hosted = button.Hosted;
				buttonCode = button.ButtonCode;
				buttonType = button.ButtonType;
				itemNumber = button.ItemNumber;
				price = button.Price;
				displayPrice = string.Format("{0:C}", button.Price);
				shippingOverride = button.ShippingOverride;
				taxOverride = button.TaxOverride;
			}
		}

		public static PayPalButtonDto FromPayPalButton(PayPalButton button)
		{
			return new PayPalButtonDto(button);
		}

		public static PayPalButton ToPayPalButton(PayPalButtonDto dto)
		{
			var button = new PayPalButton();
			ToPayPalButton(button, dto);
			return button;
		}

		public static void ToPayPalButton(PayPalButton button, PayPalButtonDto dto)
		{
			button.PayPalButtonID = dto.id ?? 0;
			button.UserName = dto.userName;
			button.Name = dto.name;
			button.Description = dto.description;
			button.Hosted = dto.hosted;
			button.ButtonCode = dto.buttonCode;
			button.ButtonType = dto.buttonType;
			button.ItemNumber = dto.itemNumber;
			button.Price = dto.price;
			button.ShippingOverride = dto.shippingOverride;
			button.TaxOverride = dto.taxOverride;
		}
	}
}