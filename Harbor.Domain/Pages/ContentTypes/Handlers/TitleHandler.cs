
using System.Collections.Generic;

namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class TitleHandler : PageLayoutContentHandler
	{
		private readonly IPathUtility _pathUtility;

		public TitleHandler(Page page, IPathUtility pathUtility)
			: base(page)
		{
			_pathUtility = pathUtility;
		}

		public override object GetLayoutContent()
		{
			var title = Page.Layout.Title;
			if (string.IsNullOrEmpty(title))
			{
				title = Page.Title;
			}

			string parentUrl = null;
			if (Page.Layout.ParentPageID != Page.PageID)
			{
				parentUrl = _pathUtility.ToAbsolute(Page.GetVirtualPath(Page.Layout.ParentPageID ?? 0, Page.Layout.Title));
			}

			return new Content.Title
			{
				DisplayTitle = title,
				ParentUrl = parentUrl,
				EnableTitleBackground = Page.TitleBackgroundEnabled,
				HideTitlebar = Page.TitleDispalyNone
			};
		}

		public override IEnumerable<string> DeclarePropertyNames()
		{
			yield return "TitleBackgroundEnabled";
			yield return "TitleDispalyNone";
		}
	}
}
