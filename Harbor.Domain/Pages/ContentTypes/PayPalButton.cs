using System;
using Harbor.Domain.Pages.ContentTypes.Handlers;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class PayPalButton : TemplateContentType
	{
		public override string Name
		{
			get { return "PayPal Button"; }
		}

		public override string Description
		{
			get { return "Turn the page into a product by adding a PayPal button."; }
		}

		public override Type HandlerType
		{
			get { return typeof(PayPalButtonHandler); }
		}
	}
}
