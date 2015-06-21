using System;
using System.Web.Mvc;
using Harbor.Domain.Pages.Queries;

namespace Harbor.UI.Models.Pages
{
	public class PageModelBinder : DefaultModelBinder
	{
		public virtual IPageQuery PageQuery
		{
			get
			{
				return DependencyResolver.Current.GetService<IPageQuery>();
			}
		}

		public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
		{
			var pageID = Convert.ToInt32(controllerContext.RouteData.Values["pageID"]);
			if (pageID == 0)
			{
				pageID = Convert.ToInt32(controllerContext.RequestContext.HttpContext.Request["pageID"]);
			}

			if (pageID == 0)
			{
				return null;
			}

			var page = PageQuery.ExecuteFromCache(new PageQueryParams { PageID = pageID });
			return page;
		}
	}
}