using PageComponents = Harbor.Domain.Pages.PageComponents;
using Products = Harbor.Domain.Products;


namespace Harbor.UI.Models.Components
{
	public class PayPalButtonDto
	{
		public int id { get; set; }
		// jch - remove this
		public int payPalButtonID { get; set; }


		public static implicit operator PayPalButtonDto(PageComponents.PayPalButton link)
		{
			return new PayPalButtonDto
			{
				payPalButtonID = link.PayPalButtonID ?? 0,
			};
		}

		public static implicit operator PayPalButtonDto(Products.PayPalButton button)
		{
			// jch! 
			return new PayPalButtonDto();
		}

		public static implicit operator Products.PayPalButton(PayPalButtonDto button)
		{
			// jch! 
			return new Products.PayPalButton();
		}
	}
}