using System.Web.Mvc;
using Harbor.Domain.Pages;
using Harbor.UI.Models.Pages;

namespace Harbor.UI
{
	public class ModelBinderConfig
	{
		public static void RegisterModelBinders(ModelBinderDictionary binders)
		{
			binders.Add(typeof(Page), new PageModelBinder());
		}
	}
}