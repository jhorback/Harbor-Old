using System;
using System.Web.Mvc;
using Harbor.Domain.Pages;

namespace Harbor.UI.Models.Page
{
	public class PageComponentModelBinder : DefaultModelBinder
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
			string uicid = controllerContext.RouteData.Values["uicid"] as string;
			var page = PageRepository.FindById(pageID);
			if (page != null)
				return page.GetComponent(uicid);
			return null;
		}
	}
}