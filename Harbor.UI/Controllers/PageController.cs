using System.Security.Principal;
using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.Content;
using Harbor.Domain.Security;
using Harbor.UI.Models;
using Harbor.UI.Models.Content;

namespace Harbor.UI.Controllers
{
	[RoutePrefix("page")]
	public class PageController : Controller
	{
		private readonly IUserRepository _userRepo;

		public PageController(IUserRepository userRepo)
		{
			_userRepo = userRepo;
		}

		[PagePermit(Permissions.Read), Route("~/id/{pageID}/{*pathInfo}", Name = "Page")]
		public ActionResult Page(Page page)
		{
			ViewBag.HasWritePermissions = page.HasPermission(User.Identity.Name, Permissions.CreateAndUpdate);
			ViewBag.PageDto = PageDto.FromPage(page);
			return View("Page", page);
		}

		[HttpGet, Route("title")]
		public PartialViewResult Title(Page page)
		{
			var title = page.Layout.GetHeaderData<Title>();
			var titleDto = TitleDto.FromTitle(title);
			return PartialView("Title", titleDto);
		}

		[HttpGet, Route("text")]
		public PartialViewResult Text(Page page, string uicid)
		{
			var text = page.Template.GetContentData<Text>(uicid);
			if (text.HasContent == false)
			{
				return NoPageContent(page, "Text", "icon-align-left");
			}
			return PartialView("Text", TextDto.FromText(text));
		}

		[HttpGet, Route("image")]
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

		[HttpGet, Route("links")]
		public PartialViewResult Links(Page page)
		{
			var links = page.Layout.GetAsideAdata<Links>();
			if (links == null)
			{
				links = new Links();
			}
			return PartialView("Links", links);
		}

		[HttpGet, Route("pagelink")]
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

		[HttpGet, Route("paypalbutton")]
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

		[HttpGet, Route("productlink")]
		public PartialViewResult ProductLink(Page page, string uicid)
		{
			var link = page.Template.GetContentData<ProductLink>(uicid);
			if (link == null || link.CanDisplay == false)
			{
				return NoPageContent(page, "Product Link", "icon-link");
			}

			// var model = ProductLinkDto.FromProductLink(link);
			if (link.ProductCount == 1)
			{
				var currentUser = _userRepo.FindUserByName(page.AuthorsUserName);
				ViewBag.MerchantID = currentUser.PayPalMerchantAccountID;
			}
			return PartialView("ProductLink", link);
		}

		//[HttpGet, Route("nopagecontent")]
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
