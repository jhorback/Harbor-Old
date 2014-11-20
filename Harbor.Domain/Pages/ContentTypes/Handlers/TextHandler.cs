using System.Collections.Generic;
using HtmlAgilityPack;

namespace Harbor.Domain.Pages.ContentTypes.Handlers
{
	public class TextHandler : TemplateContentHandler
	{
		public TextHandler(Page page, TemplateUic uic)
			: base(page, uic)
		{
		}

		public override object GetTemplateContent()
		{
			return new Content.Text(GetProperty("text"));
		}

		public override IEnumerable<PageResource> DeclareResources()
		{
			yield break;
		}

		public override IEnumerable<string> DeclarePropertyNames()
		{
			yield return UICPropertyName("text");
		}

		public override string GetPagePreviewText()
		{
			var text = GetProperty("text");
			return extractText(text);
		}

		string extractText(string html)
		{
			var text = "";
			if (html == null)
			{
				return text;
			}

			var doc = new HtmlDocument();
			html = html.Replace("><", "> <"); // add spaces between tags
			doc.LoadHtml(html);

			text = doc.DocumentNode.InnerText;


			if (text.Length > 223)
			{
				text = text.Substring(0, 223);
				text = text + " ...";
			}
			return text;
		}
	}
}
