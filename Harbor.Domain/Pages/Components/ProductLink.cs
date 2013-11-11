using System;

namespace Harbor.Domain.Pages.Components
{
	public class ProductLink : ContentComponent
	{
		public const string KEY = "productLink";

		public override string Key
		{
			get { return KEY; }
		}

		public override string Name
		{
			get
			{
				return "Product Link";
			}
		}

		public override string Description
		{
			get
			{
				return "Add a link to page that contains a PayPal button.";
			}
		}

		public override Type PageComponent
		{
			get { return typeof(PageComponents.PageLink); }
		}
	}
}

