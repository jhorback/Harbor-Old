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
				if (LinkedPage == null)
				{
					return 0;
				}
				return LinkedPage.PayPalButtons.Count;
			}
		}

		public Products.PayPalButton FirstButton
		{
			get
			{
				if (LinkedPage == null)
				{
					return null;
				}
				return LinkedPage.PayPalButtons.FirstOrDefault();
			}
		}
	}
}
