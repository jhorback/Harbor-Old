using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(PayPalButton))]
	public class PayPalButtonDto
	{
		public int? payPalButtonID { get; set; }

		public PayPalButtonDto() { }

		public PayPalButtonDto(PayPalButton button)
		{
			payPalButtonID = button.PayPalButtonID;
		}

		public static PayPalButtonDto FromPayPalButton(PayPalButton button)
		{
			return new PayPalButtonDto(button);
		}
	}
}