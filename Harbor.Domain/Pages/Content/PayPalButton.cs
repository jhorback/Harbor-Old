
namespace Harbor.Domain.Pages.Content
{
	public class PayPalButton
	{
		public PayPalButton(int? payPalButtonId, Products.PayPalButton button)
		{
			if (payPalButtonId == 0)
			{
				payPalButtonId = null;
			}

			PayPalButtonID = payPalButtonId;
			Button = button;
		}

		public int? PayPalButtonID { get; private set; }

		public Products.PayPalButton Button { get; private set; }

		public bool IsNew
		{
			get
			{
				return PayPalButtonID == null;
			}
		}

		public bool ButtonExists
		{
			get
			{
				return Button != null;
			}
		}
	}
}
