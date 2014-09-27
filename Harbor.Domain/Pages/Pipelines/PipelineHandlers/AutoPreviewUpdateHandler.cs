using Harbor.Domain.Pages.Content;
using Harbor.Domain.Pipeline;
using HtmlAgilityPack;

namespace Harbor.Domain.Pages.PipelineHandlers
{
	/// <summary>
	/// Updates the preview image and/or text if auto preview is enabled.
	/// </summary>
	public class AutoPreviewUpdateHandler  : IPipelineHanlder<Page>
	{
		public AutoPreviewUpdateHandler()
		{
		}

		public void Execute(Page page)
		{
			var foundFirstImage = false;
			var foundFirstText = false;

			if (page.AutoPreviewImage || page.AutoPreviewText)
			{
				foreach (var content in page.Template.Content)
				{
					if (foundFirstImage && foundFirstText)
					{
						break;
					}

					if (!foundFirstImage && page.AutoPreviewImage)
					{
						if (content.Key.ToLower() == "image")
						{
							var image = page.Template.GetContentData<Image>(content.Id);
							page.PreviewImageID = image.FileID;
							foundFirstImage = true;
						}
					}

					if (!foundFirstText && page.AutoPreviewText)
					{
						if (content.Key.ToLower() == "text")
						{
							var text = page.Template.GetContentData<Text>(content.Id);
							page.PreviewText = extractText(text.Html);
							foundFirstText = true;
						}
					}
				}
			}
		}

		string extractText(string html)
		{
			var doc = new HtmlDocument();
			doc.LoadHtml(html);

			var text = doc.DocumentNode.InnerText;

			text = text.Replace("><", "> <"); // add spaces between tags

			if (text.Length > 223)
			{
				text = text.Substring(0, 223);
				text = text + " ...";
			}
			return text;
		}
	}
}
