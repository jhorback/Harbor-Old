using Harbor.Domain.Pages.Content;

namespace Harbor.UI.Models.Content
{
	[MapDtoFrom(typeof(PayPalButton))]
	public class PayPalButtonDto
	{
		public int? payPalButtonID { get; set; }

		public Products.PayPalButtonDto button { get; set; }

		public PayPalButtonDto() { }

		public PayPalButtonDto(PayPalButton button)
		{
			if (button != null)
			{
				payPalButtonID = button.PayPalButtonID;
				this.button = Products.PayPalButtonDto.FromPayPalButton(button.Button);
			}
		}

		public static PayPalButtonDto FromPayPalButton(PayPalButton button)
		{
			return new PayPalButtonDto(button);
		}
	}
}