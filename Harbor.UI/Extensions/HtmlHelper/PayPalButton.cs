﻿using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Harbor.Domain.Products;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		public static MvcHtmlString PayPalButton(this HtmlHelper helper, string merchantID, PayPalButton button)
		{
			if (button.Hosted)
			{
				return new MvcHtmlString(button.ButtonCode);
			}

			var script = new TagBuilder("script");
			var attrs = new RouteValueDictionary();
			attrs["src"] = VirtualPathUtility.ToAbsolute("~/scripts/paypal-button-minicart.min.js?merchant=") + merchantID;
			attrs["data-button"] = button.ButtonType;
			attrs["data-name"] = button.Name;
			attrs["data-quantity"] = 1;
			attrs["data-amount"] = button.Price;
			attrs["data-currency"] = "USD";
			if (button.ShippingOverride != null)
			{
				attrs["data-shipping"] = button.ShippingOverride;
			}
			if (button.TaxOverride != null)
			{
				attrs["data-tax"] = button.TaxOverride;
			}

			script.MergeAttributes(attrs);
			return new MvcHtmlString(script.ToString());
		}
	}
}