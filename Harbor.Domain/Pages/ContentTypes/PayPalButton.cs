using System;

namespace Harbor.Domain.Pages.ContentTypes
{
	public class PayPalButton : PageContentType
	{
		public const string KEY = "paypalbutton";

		public override string Key
		{
			get { return KEY; }
		}

		public override string Name
		{
			get
			{
				return "PayPal Button";
			}
		}

		public override string Description
		{
			get
			{
				return "Turn the page into a product by adding a PayPal button.";
			}
		}

		public override Type PageComponent
		{
			get { return typeof(Content.PayPalButton); }
		}
	}
}
