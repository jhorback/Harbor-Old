using System;
using System.Collections.Generic;
using Harbor.Domain.Pages.PageResources;
using Harbor.Domain.Products;

namespace Harbor.Domain.Pages.PageComponents
{
	public class PayPalButton : PageComponent
	{
		public PayPalButton(Page page, string uicid)
			: base(page, uicid)
		{
			if (IsNew == false)
			{
				button = page.GetPayPalButton(PayPalButtonID ?? 0);
			}
		}

		private Products.PayPalButton button;

		public bool IsNew
		{
			get
			{
				return PayPalButtonID == null;
			}
		}

		public bool ButtonExists
		{
			get
			{
				return button != null;
			}
		}

		public int? PayPalButtonID
		{
			get
			{
				var id = GetProperty("PayPalButtonID");
				if (string.IsNullOrEmpty(id))
					return null;
				return Convert.ToInt32(id);
			}
		}

		public Products.PayPalButton Button
		{
			get
			{
				return ButtonExists ? button : null;
			}
		}
		

		public override IEnumerable<PageResource> DeclareResources()
		{
			if (PayPalButtonID == null)
			{
				yield break;
			}

			yield return new PayPalButtonResource(Page, PayPalButtonID ?? 0);
		}
	}
}
