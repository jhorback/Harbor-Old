using System.Security.Principal;
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
			var text = page.Template.GetContentData<Text>(uicid);
			return PartialView("Text", TextDto.FromText(text));
		}

		public PartialViewResult Image(Page page, string uicid)
		{
			var image = page.Template.GetContentData<Image>(uicid);
			if (image.CanDisplay == false)
			{
				return NoPageContent(page, "Image", "icon-image");
			}

			var model = ImageDto.FromImage(image);
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
			var link = page.Template.GetContentData<PageLink>(uicid);
			if (link.CanDisplay == false)
			{
				return NoPageContent(page, "Page Link", "icon-pagelink");
			}

			var model = PageLinkDto.FromPageLink(link);
			return PartialView("PageLink", model);
		}

		public PartialViewResult PayPalButton(Page page, string uicid)
		{
			var currentUser = _userRepo.FindUserByName(page.AuthorsUserName);
			ViewBag.MerchantID = currentUser.PayPalMerchantAccountID;

			var buttonComponent = page.Template.GetContentData<PayPalButton>(uicid);
			if (!buttonComponent.ButtonExists)
			{
				return NoPageContent(page, "PayPal Button", "icon-paypal");
			}

			var button = page.GetPayPalButton(buttonComponent.PayPalButtonID ?? 0);
			return PartialView("PayPalButton", button);
		}

		public PartialViewResult ProductLink(Page page, string uicid)
		{
			var link = page.Template.GetContentData<ProductLink>(uicid);
			if (link == null || link.CanDisplay == false)
			{
				return NoPageContent(page, "Product Link", "icon-link");
			}

			var model = ProductLinkDto.FromProductLink(link);
			if (model.productCount == 1)
			{
				var currentUser = _userRepo.FindUserByName(page.AuthorsUserName);
				ViewBag.MerchantID = currentUser.PayPalMerchantAccountID;
			}
			return PartialView("ProductLink", model);
		}

		public PartialViewResult NoPageContent(Page page, string text, string icon)
		{
			return new NoPageContentResult(User, page, text, icon);
		}
	}


	public class NoPageContentResult : PartialViewResult
	{
		public NoPageContentResult(IPrincipal user, Page page, string text, string icon)
		{
			ViewName = "NoPageContent";
			ViewBag.IsOwner = page.AuthorsUserName == user.Identity.Name;
			ViewBag.NoContentText = text;
			ViewBag.NoContentIcon = icon;
		}
	}
}
