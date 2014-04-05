using System.Linq;

namespace Harbor.Domain.Pages.Content
{
	public class ProductLink : PageLink
	{

		public ProductLink(IPageRepository pageRepository, Page page, string uicid) : base(page, uicid)
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
