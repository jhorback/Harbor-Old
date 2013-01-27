using System;
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
			var max = Convert.ToInt32(image.GetProperty("max"));
			if (max < 50) max = 500;
			var name = image.GetProperty("name");
			var ext = image.GetProperty("ext");
			var imageSrc = FileUrls.GetUrl(fileID, name, ext, max: max);
			var model = new ImageDto { imgSrc = imageSrc, maxClass = "max-" + max };
			
			return PartialView("Image", model);      	
		}

		public PartialViewResult Links()
		{
			return PartialView("Links");
		}
	}
}
