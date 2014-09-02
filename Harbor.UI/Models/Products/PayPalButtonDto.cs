﻿using Harbor.Domain.Products;

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
		public decimal? shippingOverride { get; set; }
		public decimal? taxOverride { get; set; }

		public PayPalButtonDto() { }

		public PayPalButtonDto(PayPalButton button)
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
			shippingOverride = button.ShippingOverride;
			taxOverride = button.TaxOverride;
		}

		public static PayPalButtonDto FromPayPalButton(PayPalButton button)
		{
			return new PayPalButtonDto(button);
		}

		public static PayPalButton ToPayPalButton(PayPalButtonDto button)
		{
			return new PayPalButton
			{
				PayPalButtonID = button.id ?? 0,
				UserName = button.userName,
				Name = button.name,
				Description = button.description,
				Hosted = button.hosted,
				ButtonCode = button.buttonCode,
				ButtonType = button.buttonType,
				ItemNumber = button.itemNumber,
				Price = button.price,
				ShippingOverride = button.shippingOverride,
				TaxOverride = button.taxOverride
			};
		}
	}
}