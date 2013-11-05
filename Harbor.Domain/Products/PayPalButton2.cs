using System;

namespace Harbor.Domain.Products
{
	public class PayPalButton2
	{
		public int PayPalButtonID { get; set; }
		public string Name { get; set; }
		public string UserName { get; set; }
		public string Description { get; set; }

		public bool Hosted { get; set; }
		public string ButtonCode { get; set; }
		public Decimal Price { get; set; }
	}
}
