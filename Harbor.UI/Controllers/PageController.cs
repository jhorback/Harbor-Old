using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.PageComponents;
using Harbor.Domain.Security;
using Harbor.UI.Models;
using Harbor.UI.Models.Components;

namespace Harbor.UI.Controllers
{
	public class PageController : Controller
	{
		private readonly IUserRepository _userRepo;

		public PageController(IUserRepository userRepo)
		{
			_userRepo = userRepo;
		}

		public PartialViewResult Title(Page page)
		{
			return PartialView("Title", (PageDto)page);
		}

		public PartialViewResult Text(Page page, string uicid)
		{
			var text = page.GetComponent<Text>(uicid);
			return PartialView("Text", new TextDto { text = text.GetProperty("text") });
		}

		public PartialViewResult Image(Page page, string uicid)
		{
			var image = page.GetComponent<Image>(uicid);
			if (image.CanDisplay(User.Identity.Name) == false)
			{
				return PartialView("Image-None");
			}

			var model = (ImageDto)image;
			return PartialView("Image", model);
		}

		public PartialViewResult Links(Page page, string uicid)
		{
			var links = page.GetComponent<Links>(uicid);
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
			var link = page.GetComponent<PageLink>(uicid);
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

			var buttonComponent = page.GetComponent<PayPalButton>(uicid);
			if (!buttonComponent.ButtonExists)
			{
				return PartialView("PayPalButton-None");
			}

			var button = page.GetPayPalButton(buttonComponent.PayPalButtonID ?? 0);
			return PartialView("PayPalButton", button);
		}

		public PartialViewResult ProductLink(Page page, string uicid)
		{
			var link = page.GetComponent<ProductLink>(uicid);
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
