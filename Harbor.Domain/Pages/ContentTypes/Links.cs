using System;
using System.Collections.Generic;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class Links : ContentType
	{
		public override Type HandlerType
		{
			// get { return typeof(AsideHandler<Content.Links>); }
			get { return typeof(TestLinksHandler); }
		}
	}

	public class TestLinksHandler : PageLayoutContentHandler
	{
		public TestLinksHandler(Page page) : base(page)
		{
		}

		public override object GetLayoutContent()
		{
			var aside = GetAside<Content.Links>();
			if (aside == null)
			{
				aside = new Content.Links
				{
					sections = new List<Content.Links.LinksSection>()
					{
						new Content.Links.LinksSection()
						{
							title = "Test Title",
							links = new List<Content.Links.LinksSectionLink>()
							{
								new Content.Links.LinksSectionLink()
								{
									pageID = 50,
									text = "Test Page Link 50"
								}
							}
						}
					}
				};
			}
			aside.EnsureIds();
			return aside;
		}
	}
}
