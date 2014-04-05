using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Content;
using Harbor.Domain.Security;
using Harbor.UI.Models;
using Harbor.UI.Models.Components;

namespace Harbor.UI.Controllers
{
	public class PageController : Controller
	{
		private readonly IUserRepository _userRepo;
		private readonly IPageComponentRepository _pageComponentRepository;

		public PageController(IUserRepository userRepo, IPageComponentRepository pageComponentRepository)
		{
			_userRepo = userRepo;
			_pageComponentRepository = pageComponentRepository;
		}

		public PartialViewResult Title(Page page)
		{
			return PartialView("Title", (PageDto)page);
		}

		public PartialViewResult Text(Page page, string uicid)
		{
			var text = _pageComponentRepository.GetComponent<Text>(page, uicid);
			return PartialView("Text", new TextDto { text = text.GetProperty("text") });
		}

		public PartialViewResult Image(Page page, string uicid)
		{
			var image = _pageComponentRepository.GetComponent<Image>(page, uicid);
			if (image.CanDisplay(User.Identity.Name) == false)
			{
				return PartialView("Image-None");
			}

			var model = (ImageDto)image;
			return PartialView("Image", model);
		}

		public PartialViewResult Links(Page page, string uicid)
		{
			var links = _pageComponentRepository.GetComponent<Links>(page, uicid);
			ViewBag.Page = page;
			if (links.IsNew())
			{
				return PartialView("Links-None");
			}

			var model = (NavLinksDto)links;
			return PartialView("Links", model);
		}

		public PartialViewResult PageLink(Page page, string uicid)
		{
			var link = _pageComponentRepository.GetComponent<PageLink>(page, uicid);
			if (link.CanDisplay(User.Identity.Name) == false)
			{
				return PartialView("PageLink-None", link);
			}

			var model = (PageLinkDto)link;
			return PartialView("PageLink", model);
		}

		public PartialViewResult PayPalButton(Page page, string uicid)
		{
			var currentUser = _userRepo.FindUserByName(page.AuthorsUserName);
			ViewBag.MerchantID = currentUser.PayPalMerchantAccountID;

			var buttonComponent = _pageComponentRepository.GetComponent<PayPalButton>(page, uicid);
			if (!buttonComponent.ButtonExists)
			{
				return PartialView("PayPalButton-None");
			}

			var button = page.GetPayPalButton(buttonComponent.PayPalButtonID ?? 0);
			return PartialView("PayPalButton", button);
		}

		public PartialViewResult ProductLink(Page page, string uicid)
		{
			var link = _pageComponentRepository.GetComponent<ProductLink>(page, uicid);
			if (link.CanDisplay(User.Identity.Name) == false)
			{
				return PartialView("PageLink-None", link);
			}

			var model = (ProductLinkDto)link;
			if (model.productCount == 1)
			{
				var currentUser = _userRepo.FindUserByName(page.AuthorsUserName);
				ViewBag.MerchantID = currentUser.PayPalMerchantAccountID;
			}
			return PartialView("ProductLink", model);
		}
	}
}
