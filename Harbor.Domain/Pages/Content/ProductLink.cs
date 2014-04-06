using System.Linq;

namespace Harbor.Domain.Pages.Content
{
	public class ProductLink : PageLink
	{

		public ProductLink(Page page, string uicid, IPageRepository pageRepository) : base(page, uicid)
		{
			if (IsNew() == false)
			{
				LinkedPage = pageRepository.FindById(PageID);
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
	}
}
