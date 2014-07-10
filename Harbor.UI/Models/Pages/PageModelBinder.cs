using System;
using System.Web.Mvc;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models.Pages
{
	public class PageModelBinder : DefaultModelBinder
	{
		public virtual IPageRepository PageRepository
		{
			get
			{
				return DependencyResolver.Current.GetService<IPageRepository>();
			}
		}

		public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
		{
			var pageID = Convert.ToInt32(controllerContext.RouteData.Values["pageID"]);
			if (pageID == 0)
			{
				pageID = Convert.ToInt32(controllerContext.RequestContext.HttpContext.Request["pageID"]);
			}
			var page = PageRepository.FindById(pageID);
			return page;
		}
	}
}