using System;
using Harbor.Domain.Pages.PageResources;

namespace Harbor.Domain.Pages.ContentTypes
{
	[Obsolete("Moving to the page layout")]
	public class Links : PageContentType
	{
		public const string KEY = "links";

		public override string Key
		{
			get { return KEY; }
		}

		public override string Name
		{
			get
			{
				return "Links";
			}
		}

		public override string Description
		{
			get
			{
				return "Provides links to related documents.";
			}
		}

		public override Type PageComponent
		{
			get { return typeof(Content.Links); }
		}
	}
}
