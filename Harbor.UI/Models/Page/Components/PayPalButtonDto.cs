using Harbor.Domain.Pages.PageComponents;


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