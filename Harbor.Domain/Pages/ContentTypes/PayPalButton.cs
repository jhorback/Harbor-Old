using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.PageResources;
using Harbor.Domain.Products;

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
		private readonly IPayPalButtonRepository _payPalButtonRepository;

		public PayPalButtonHandler(Page page, TemplateUic uic, IPayPalButtonRepository payPalButtonRepository) : base(page, uic)
		{
			_payPalButtonRepository = payPalButtonRepository;
		}

		public override object GetTemplateContent()
		{
			Products.PayPalButton button = null;
			int buttonId;
			var isValidButtonId = int.TryParse(GetProperty("payPalButtonID"), out buttonId);
			if (isValidButtonId)
			{
				button = Page.GetPayPalButton(buttonId);
			}
			else
			{
				button = new Products.PayPalButton
				{
					Name = Page.Title
				};
			}
			return new Content.PayPalButton(buttonId, button);
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			var button = GetContent<Content.PayPalButton>();
			if (button == null || button.PayPalButtonID == null)
			{
				yield break;
			}

			yield return new PayPalButtonResource(Page, button.PayPalButtonID ?? 0);
		}

		public override IEnumerable<string> DeclarePropertyNames()
		{
			yield return UICPropertyName("payPalButtonID");
		}

		public override void OnDelete()
		{
			var contentButton = GetContent<Content.PayPalButton>();
			if (!contentButton.ButtonExists)
			{
				return;
			}

			var button = _payPalButtonRepository.FindById(contentButton.PayPalButtonID ?? 0, readOnly: false);
			if (button != null)
			{
				_payPalButtonRepository.Delete(button);				
			}
		}
	}
}
