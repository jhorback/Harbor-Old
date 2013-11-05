
namespace Harbor.Domain.Pages.PageResources
{
	public class PayPalButtonResource : PageResource
	{
		public PayPalButtonResource(Page page, int payPalButtonID) : base(page)
		{
			PayPalButtonID = payPalButtonID;
		}


		public int PayPalButtonID { get; set; }


		public override bool Equals(object obj)
		{
			if (obj == null)
			{
				return false;
			}

			var res = obj as PayPalButtonResource;
			if (res == null)
			{
				return false;
			}

			return res.PayPalButtonID == PayPalButtonID;
		}

		public override int GetHashCode()
		{
			return PayPalButtonID.GetHashCode();
		}
	}
}
