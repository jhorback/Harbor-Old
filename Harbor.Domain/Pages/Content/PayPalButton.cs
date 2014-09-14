
namespace Harbor.Domain.Pages.Content
{
	public class PayPalButton
	{
		public PayPalButton(int? payPalButtonID, Products.PayPalButton button)
		{
			if (payPalButtonID == 0)
			{
				payPalButtonID = null;
			}

			PayPalButtonID = payPalButtonID;
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
