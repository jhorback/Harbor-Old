using System.Linq;

namespace Harbor.Domain.Pages.PageComponents
{
	public class ProductLink : PageLink
	{
		public ProductLink(Page page, string uicid) : base(page, uicid)
		{
			if (IsNew() == false)
			{
				LinkedPage = page.GetPageLink(PageID);
			}
		}

		public int ProductCount
		{
			get
			{
				return LinkedPage.PayPalButtons.Count;
			}
		}

		public Products.PayPalButton FirstButton
		{
			get
			{
				return LinkedPage.PayPalButtons.FirstOrDefault();
			}
		}

		// jch! - product link properties
		// basically want the entire product link + the merchant ID
		// create the ProductLinkDTO - can I re-use something on the client like PayPalButton?
	}
}
