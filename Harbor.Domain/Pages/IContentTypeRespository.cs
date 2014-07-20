using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public interface IContentTypeRepository
	{
		IEnumerable<ContentType> GetTemplateContentTypes();
		TemplateContentHandler GetTemplateContentHandler(string key, Page page);
		PageLayoutContentHandler GetLayoutContentHandler(string key, Page page);
	}
}
