using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public interface IContentTypeRepository
	{
		IEnumerable<TemplateContentType> GetTemplateContentTypes();
		bool TemplateContentTypeExists(string key);
		TemplateContentHandler GetTemplateContentHandler(TemplateUic uic, Page page);
		PageLayoutContentHandler GetLayoutContentHandler(string key, Page page);
	}
}
