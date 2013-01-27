using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.UI.Models.Page;

namespace Harbor.UI
{
	public class ModelBinderConfig
	{
		public static void RegisterModelBinders(ModelBinderDictionary binders)
		{
			binders.Add(typeof(Page), new PageModelBinder());
			binders.Add(typeof(PageComponent), new PageComponentModelBinder());
		}
	}
}