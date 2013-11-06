using System;
using System.ComponentModel.DataAnnotations;
using Harbor.Domain.Security;

namespace Harbor.Domain.Products
{
	public class PayPalButton : IAggregateRoot
	{
		[Key]
		public int PayPalButtonID { get; set; }

		[Required]
		[StringLength(50)]
		public string UserName { get; set; }

		/// <summary>
		/// Display text shown in PayPal.
		/// </summary>
		[Required]
		[StringLength(150)]
		public string Name { get; set; }

		/// <summary>
		/// Display text shown in Harbor.
		/// </summary>
		[StringLength(150)]
		public string Description { get; set; }

		public bool Hosted { get; set; }

		public string ButtonCode { get; set; }

		[StringLength(50)]
		public string ButtonType { get; set; }
		
		[StringLength(50)]
		public string ItemNumber { get; set; }
	
		public Decimal Price { get; set; }
		
		public Decimal? ShippingOverride { get; set; }
		
		public Decimal? TaxOverride { get; set; }


		#region associations
		public User Owner { get; set; }
		#endregion
	}
}
