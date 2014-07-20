using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Content;
using Harbor.Domain.Security;
using Harbor.UI.Models;
using Harbor.UI.Models.Content;

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
			return PartialView("Title", PageDto.FromPage(page));
		}

		public PartialViewResult Text(Page page, string uicid)
		{
			var text = page.Template.GetContent<Text>(uicid);
			return PartialView("Text", new TextDto { text = text.Html });
		}

		public PartialViewResult Image(Page page, string uicid)
		{
			var image = page.Template.GetContent<Image>(uicid);
			if (image.CanDisplay == false)
			{
				return PartialView("Image-None");
			}

			var model = (ImageDto)image;
			return PartialView("Image", model);
		}

		public PartialViewResult Links(Page page)
		{
			var links = page.Layout.GetAsideAdata<Links>();
			if (links == null)
			{
				links = new Links();
			}
			return PartialView("Links", links);
		}

		public PartialViewResult PageLink(Page page, string uicid)
		{
			var link = page.Template.GetContent<PageLink>(uicid);
			//var link = _pageContentRepository.GetContent<PageLink>(page, uicid);
			if (link.CanDisplay == false)
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

			var buttonComponent = page.Template.GetContent<PayPalButton>(uicid);
			if (!buttonComponent.ButtonExists)
			{
				return PartialView("PayPalButton-None");
			}

			var button = page.GetPayPalButton(buttonComponent.PayPalButtonID ?? 0);
			return PartialView("PayPalButton", button);
		}

		public PartialViewResult ProductLink(Page page, string uicid)
		{
			var link = page.Template.GetContent<ProductLink>(uicid);
			if (link.CanDisplay == false)
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
