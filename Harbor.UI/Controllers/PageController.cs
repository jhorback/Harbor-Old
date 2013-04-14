using System;
using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.Domain.Pages.PageComponents;
using Harbor.UI.Models;
using Harbor.UI.Models.Components;

namespace Harbor.UI.Controllers
{
	public class PageController : Controller
	{
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
			if (image.IsNew())
			{
				return PartialView("Image-None");
			}

			var model = (ImageDto)image;			
			return PartialView("Image", model);      	
		}

		public PartialViewResult Links()
		{
			return PartialView("Links");
		}

		public PartialViewResult PageLink(Page page, string uicid)
		{
			var link = page.GetComponent<PageLink>(uicid);
			if (link.IsNew())
			{
				return PartialView("PageLink-None");
			}

			var model = (PageLinkDto)link;
			return PartialView("PageLink", model);
		}
	}
}
