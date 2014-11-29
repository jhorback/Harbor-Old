using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Harbor.Domain.Pages.Content
{
	public class ProductLink : PageLink
	{
		public ProductLink(int pageId, string tileDisplay, Page linkedPage, string userName)
			: base(pageId, tileDisplay, linkedPage, userName)
		{
		}

		public IEnumerable<Products.PayPalButton> Buttons
		{
			get
			{
				if (LinkedPage == null || LinkedPage.PayPalButtons == null)
				{
					yield break;
				}
				else
				{
					foreach (var button in LinkedPage.PayPalButtons)
					{
						yield return button;						
					}
				}
			}
		}



		// jch! - may not need these


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
