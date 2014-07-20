using System.Linq;

namespace Harbor.Domain.Pages.Content
{
	public class ProductLink : PageLink
	{
		public ProductLink(int pageId, string tileDisplay, Page linkedPage, string userName)
			: base(pageId, tileDisplay, linkedPage, userName)
		{
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
	}
}
