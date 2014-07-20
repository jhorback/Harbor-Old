using System.Collections.Generic;

namespace Harbor.Domain.Pages
{
	public interface IContentTypeRepository
	{
		IEnumerable<ContentType> GetTemplateContentTypes();
		TemplateContentHandler GetTemplateContentHandler(TemplateUic uic, Page page);
		PageLayoutContentHandler GetLayoutContentHandler(string key, Page page);
	}
}
