using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.PageResources;

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

	public class PayPalButtonHandler : TemplateContentHandler
	{
		public PayPalButtonHandler(Page page, TemplateUic uic) : base(page, uic)
		{

		}

		public override object GetTemplateContent()
		{
			//var id = GetProperty("PayPalButtonID");
			//if (string.IsNullOrEmpty(id))
			//	return null;
			//return Convert.ToInt32(id);
			//if (IsNew == false)
			//{
			//	button = page.GetPayPalButton(PayPalButtonID ?? 0);
			//}
			return new Content.PayPalButton();
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			var button = Page.Template.GetContent<>()
			if (PayPalButtonID == null)
			{
				yield break;
			}

			yield return new PayPalButtonResource(Page, PayPalButtonID ?? 0);
		}
	}
}
