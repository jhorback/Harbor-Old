using System;
using Harbor.Domain.Pages.ContentTypes.Handlers;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class ProductLink : TemplateContentType
	{
		public override string Name
		{
			get { return "Product Link"; }
		}

		public override string Description
		{
			get { return "Add a link to page that contains a PayPal button."; }
		}

		public override Type HandlerType
		{
			get { return typeof(ProductLinkHandler); }
		}
	}
}

