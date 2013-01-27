using System.Web.Mvc;
using Harbor.Domain.Pages;
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

		public PartialViewResult Text(PageComponent text)
		{
			return PartialView("Text", new TextDto { text = text.GetProperty("text") });
		}

		public PartialViewResult Image(PageComponent image)
		{
			if (image.HasProperty("fileID") == false)
			{
				return PartialView("ImageNone");
			}

			var fileID = image.GetProperty("fileID");
			var max = image.GetProperty("max");
			var imageSrc = Url.Content("~/file/" + fileID + ".jpg?max=" + max);
			var model = new ImageDto { imgSrc = imageSrc, maxClass = "foo" };
			return PartialView("Image", model);      	
		}

		public PartialViewResult Links()
		{
			return PartialView("Links");
		}
	}
}
