using System.Web;
using Harbor.Domain.Files;
using Harbor.Domain.Pages.PageComponents;
using Harbor.Domain.Products;

namespace Harbor.UI.Models.Components
{
	public class PayPalButtonDto
	{
		public int payPalButtonID { get; set; }


		public static implicit operator PayPalButtonDto(PayPalButton link)
		{
			return new PayPalButtonDto
			{
				payPalButtonID = link.PayPalButtonID ?? 0,
			};
		}
	}
}